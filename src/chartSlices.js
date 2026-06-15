export const chartColors = ["#1d5c4a", "#d8b23f", "#376c9f", "#c66a4a", "#6f7f5d", "#8d6ab8", "#2e8b7d"];

export function buildPieSlices(data) {
  const total = data.reduce((sum, item) => sum + Number(item.value ?? 0), 0);
  if (!total) return [];

  let cursor = 0;
  return data.map((item, index) => {
    const percent = round((Number(item.value ?? 0) / total) * 100);
    const start = cursor;
    const end = index === data.length - 1 ? 100 : round(cursor + percent);
    cursor = end;

    return {
      ...item,
      color: chartColors[index % chartColors.length],
      percent,
      stop: `${chartColors[index % chartColors.length]} ${start}% ${end}%`
    };
  });
}

function round(value) {
  return Math.round(value * 100) / 100;
}
