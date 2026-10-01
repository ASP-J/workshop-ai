// Largura (em %) de uma barra do grafico.
// Valor 0 (ou invalido) fica vazio; valores > 0 ganham um minimo para continuar visiveis.
const MIN_VISIBLE_PERCENT = 8;

export function barWidthPercent(value, max) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0 || !(max > 0)) return 0;
  return Math.min(100, Math.max(MIN_VISIBLE_PERCENT, (number / max) * 100));
}
