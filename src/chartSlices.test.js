import { describe, expect, it } from "vitest";
import { buildPieSlices, chartColors } from "./chartSlices.js";

describe("buildPieSlices", () => {
  it("converts chart data into percentages and conic-gradient stops", () => {
    const slices = buildPieSlices([
      { label: "Produto", value: 30 },
      { label: "Tecnologia", value: 10 }
    ]);

    expect(slices).toEqual([
      {
        label: "Produto",
        value: 30,
        color: chartColors[0],
        percent: 75,
        stop: `${chartColors[0]} 0% 75%`
      },
      {
        label: "Tecnologia",
        value: 10,
        color: chartColors[1],
        percent: 25,
        stop: `${chartColors[1]} 75% 100%`
      }
    ]);
  });

  it("returns an empty list when values are empty", () => {
    expect(buildPieSlices([{ label: "Produto", value: 0 }])).toEqual([]);
  });
});
