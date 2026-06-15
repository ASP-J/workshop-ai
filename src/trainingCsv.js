export function parseTrainingCsv(csvText) {
  const rows = parseRows(csvText).filter((row) => row.some((cell) => cell.trim()));
  if (rows.length < 2) return [];

  const headers = rows[0].map((header) => header.trim());

  return rows
    .slice(1)
    .map((row) => objectFromRow(headers, row))
    .map((record) => ({
      email: normalizeEmail(record.email),
      area: clean(record.area),
      categoria: clean(record.categoria),
      curso: clean(record.curso),
      horas: positiveNumber(record.horas_capacitacao),
      status: clean(record.status_capacitacao),
      nota: positiveNumber(record.nota),
      concluidoEm: clean(record.concluido_em)
    }))
    .filter((record) => record.email);
}

function objectFromRow(headers, row) {
  return headers.reduce((record, header, index) => {
    record[header] = row[index] ?? "";
    return record;
  }, {});
}

function parseRows(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);
  return rows;
}

function clean(value) {
  return String(value ?? "").trim();
}

function normalizeEmail(value) {
  return clean(value).toLowerCase();
}

function positiveNumber(value) {
  const number = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(number) && number > 0 ? number : 0;
}
