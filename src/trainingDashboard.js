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

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      platformStatus: user.status,
      area: areas.join(", ") || "-",
      categories: categories.join(", ") || "-",
      courses: courses.join(", ") || "-",
      hours,
      averageScore: average(records.map((record) => record.nota)),
      trainingStatus: records.length ? "Com dados" : "Sem dados no CSV"
    };
  });

  const unmatchedCsvEmails = uniqueSorted(
    trainingRecords.map((record) => record.email).filter((email) => !matchedEmails.has(normalizeEmail(email)))
  );
  const matchedRecords = trainingRecords.filter((record) => matchedEmails.has(normalizeEmail(record.email)));
  const trainedRows = rows.filter((row) => row.hours > 0);
  const totalHours = sum(rows.map((row) => row.hours));

  return {
    rows,
    unmatchedCsvEmails,
    summary: {
      totalUsers: users.length,
      usersWithTraining: trainedRows.length,
      totalHours,
      averageHours: trainedRows.length ? round(totalHours / trainedRows.length) : 0,
      coveragePercent: users.length ? Math.round((trainedRows.length / users.length) * 100) : 0
    },
    charts: {
      hoursByArea: sortChart(groupSum(matchedRecords, "area", "horas")),
      usersByCategory: sortLabels(groupUniqueUsersByCategory(matchedRecords)),
      statusCount: [
        { label: "Com dados", value: trainedRows.length },
        { label: "Sem dados no CSV", value: rows.length - trainedRows.length }
      ].filter((item) => item.value > 0),
      topCourses: sortChart(groupSum(matchedRecords, "curso", "horas")).slice(0, 5)
    }
  };
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
