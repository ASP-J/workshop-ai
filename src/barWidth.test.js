import { describe, expect, it } from "vitest";
import { barWidthPercent } from "./barWidth.js";

describe("barWidthPercent", () => {
  it("renders an empty bar for 0", () => {
    expect(barWidthPercent(0, 40)).toBe(0);
  });

  it("keeps a visible minimum for small positive values", () => {
    expect(barWidthPercent(1, 100)).toBe(8);
  });

  it("is proportional to the max for larger values", () => {
    expect(barWidthPercent(20, 40)).toBe(50);
    expect(barWidthPercent(40, 40)).toBe(100);
  });

  it("treats invalid values as empty", () => {
    expect(barWidthPercent(undefined, 10)).toBe(0);
    expect(barWidthPercent(-3, 10)).toBe(0);
  });
});
