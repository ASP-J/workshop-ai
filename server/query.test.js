import { describe, expect, it } from "vitest";
import { buildUsersQuery } from "./query.js";

describe("buildUsersQuery", () => {
  it("uses safe pagination defaults when values are missing", () => {
    const query = buildUsersQuery();

    expect(query.toString()).toBe("page=1&per_page=10");
  });

  it("keeps only filled optional filters", () => {
    const query = buildUsersQuery({
      page: "2",
      per_page: "25",
      name: " Ana ",
      email: "",
      user_id: " 42 "
    });

    expect(query.get("page")).toBe("2");
    expect(query.get("per_page")).toBe("25");
    expect(query.get("name")).toBe("Ana");
    expect(query.get("user_id")).toBe("42");
    expect(query.has("email")).toBe(false);
  });

  it("caps per_page to keep the workshop demo light", () => {
    const query = buildUsersQuery({ per_page: "5000" });

    expect(query.get("per_page")).toBe("100");
  });
});
