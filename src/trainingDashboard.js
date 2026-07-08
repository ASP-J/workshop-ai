export function buildTrainingDashboard(users, trainingRecords) {
  const recordsByEmail = groupByEmail(trainingRecords);
  const matchedEmails = new Set();

  const rows = users.map((user) => {
    const email = normalizeEmail(user.email);
    const records = recordsByEmail.get(email) ?? [];
    if (records.length) matchedEmails.add(email);

    const hours = sum(records.map((record) => record.horas));
    const categories = uniqueSorted(records.map((record) => record.categoria));
    const courses = uniqueSorted(records.map((record) => record.curso));
    const areas = uniqueSorted(records.map((record) => record.area));

    const totalCourses = records.length;
    const completedCourses = records.filter((record) => isConcluded(record.status)).length;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      platformStatus: user.status,
      sector: user.sector || "Sem setor",
      area: areas.join(", ") || "-",
      categories: categories.join(", ") || "-",
      courses: courses.join(", ") || "-",
      hours,
      averageScore: average(records.map((record) => record.nota)),
      trainingStatus: records.length ? "Com dados" : "Sem dados no CSV",
      completedCourses,
      totalCourses,
      completionStatus: completionStatusFor(totalCourses, completedCourses)
    };
  });

  const unmatchedCsvEmails = uniqueSorted(
    trainingRecords.map((record) => record.email).filter((email) => !matchedEmails.has(normalizeEmail(email)))
  );
  const matchedRecords = trainingRecords.filter((record) => matchedEmails.has(normalizeEmail(record.email)));
  const trainedRows = rows.filter((row) => row.hours > 0);
  const rowsWithData = rows.filter((row) => row.totalCourses > 0);
  const completedUsers = rows.filter((row) => row.completionStatus === "Concluiu");
  const partialUsers = rows.filter((row) => row.completionStatus === "Parcial");
  const notCompletedUsers = rows.filter((row) => row.completionStatus === "Nao concluiu");
  const totalHours = sum(rows.map((row) => row.hours));
  const scoredRows = rows.filter((row) => row.averageScore > 0);

  return {
    rows,
    unmatchedCsvEmails,
    summary: {
      totalUsers: users.length,
      usersWithTraining: trainedRows.length,
      usersCompleted: completedUsers.length,
      usersNotCompleted: rowsWithData.length - completedUsers.length,
      totalHours,
      averageHours: trainedRows.length ? round(totalHours / trainedRows.length) : 0,
      coveragePercent: users.length ? Math.round((trainedRows.length / users.length) * 100) : 0,
      completionRate: rowsWithData.length ? Math.round((completedUsers.length / rowsWithData.length) * 100) : 0,
      hoursPerUser: rowsWithData.length ? round(totalHours / rowsWithData.length) : 0,
      averageScore: scoredRows.length ? round(sum(scoredRows.map((row) => row.averageScore)) / scoredRows.length) : 0,
      sectorsCount: new Set(rows.map((row) => row.sector)).size
    },
    charts: {
      hoursByArea: sortChart(groupSum(matchedRecords, "area", "horas")),
      usersByCategory: sortLabels(groupUniqueUsersByCategory(matchedRecords)),
      statusCount: [
        { label: "Com dados", value: trainedRows.length },
        { label: "Sem dados no CSV", value: rows.length - trainedRows.length }
      ].filter((item) => item.value > 0),
      completionCount: [
        { label: "Concluiu", value: completedUsers.length },
        { label: "Parcial", value: partialUsers.length },
        { label: "Nao concluiu", value: notCompletedUsers.length }
      ].filter((item) => item.value > 0),
      usersBySector: sortChart(countBy(rows, "sector")),
      hoursBySector: sortChart(sumBy(rows, "sector", "hours")),
      completionRateBySector: sectorCompletionRates(rows),
      topCourses: sortChart(groupSum(matchedRecords, "curso", "horas")).slice(0, 5)
    }
  };
}

function countBy(rows, key) {
  const map = new Map();
  for (const row of rows) {
    const label = row[key] || "-";
    map.set(label, (map.get(label) ?? 0) + 1);
  }
  return [...map.entries()].map(([label, value]) => ({ label, value }));
}

function sumBy(rows, key, valueKey) {
  const map = new Map();
  for (const row of rows) {
    const label = row[key] || "-";
    map.set(label, (map.get(label) ?? 0) + Number(row[valueKey] ?? 0));
  }
  return [...map.entries()].map(([label, value]) => ({ label, value: round(value) }));
}

function sectorCompletionRates(rows) {
  const map = new Map();
  for (const row of rows) {
    if (row.totalCourses === 0) continue;
    const sector = row.sector || "-";
    const bucket = map.get(sector) ?? { withData: 0, completed: 0 };
    bucket.withData += 1;
    if (row.completionStatus === "Concluiu") bucket.completed += 1;
    map.set(sector, bucket);
  }
  return [...map.entries()]
    .map(([label, bucket]) => ({ label, value: Math.round((bucket.completed / bucket.withData) * 100) }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
}

function isConcluded(status) {
  return String(status ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") === "concluido";
}

function completionStatusFor(totalCourses, completedCourses) {
  if (totalCourses === 0) return "Sem dados no CSV";
  if (completedCourses === totalCourses) return "Concluiu";
  if (completedCourses > 0) return "Parcial";
  return "Nao concluiu";
}

function groupByEmail(records) {
  const map = new Map();
  for (const record of records) {
    const email = normalizeEmail(record.email);
    if (!email) continue;
    map.set(email, [...(map.get(email) ?? []), record]);
  }
  return map;
}

function groupSum(records, labelKey, valueKey) {
  const map = new Map();
  for (const record of records) {
    const label = record[labelKey] || "-";
    map.set(label, (map.get(label) ?? 0) + Number(record[valueKey] ?? 0));
  }
  return [...map.entries()].map(([label, value]) => ({ label, value: round(value) }));
}

function groupUniqueUsersByCategory(records) {
  const map = new Map();
  for (const record of records) {
    const label = record.categoria || "-";
    const users = map.get(label) ?? new Set();
    users.add(normalizeEmail(record.email));
    map.set(label, users);
  }
  return [...map.entries()].map(([label, users]) => ({ label, value: users.size }));
}

function sortChart(items) {
  return items.sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
}

function sortLabels(items) {
  return items.sort((a, b) => a.label.localeCompare(b.label));
}

function uniqueSorted(values) {
  return [...new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value ?? 0), 0);
}

function average(values) {
  const numeric = values.map(Number).filter((value) => Number.isFinite(value) && value > 0);
  return numeric.length ? round(sum(numeric) / numeric.length) : 0;
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}
