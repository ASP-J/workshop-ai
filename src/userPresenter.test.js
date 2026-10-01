import { describe, expect, it } from "vitest";
import { presentUsers } from "./userPresenter.js";

describe("presentUsers", () => {
  it("maps Twygo API users to table-friendly rows", () => {
    const result = presentUsers({
      message: "success",
      data: {
        users: [
          {
            user_id: 7,
            first_name: "Maria",
            last_name: "Silva",
            email: "maria@example.com",
            active: true
          }
        ],
        pagination: { page: 1, per_page: 10, total: 42 }
      }
    });

    expect(result.users).toEqual([
      {
        id: "7",
        name: "Maria Silva",
        email: "maria@example.com",
        status: "Ativo",
        sector: "Sem setor"
      }
    ]);
    expect(result.pagination.total).toBe(42);
  });

  it("reads total_entries, the field the Twygo API actually sends", () => {
    const result = presentUsers({
      data: {
        users: [{ user_id: 1, name: "Ana", email: "ana@example.com" }],
        pagination: { current_page: 1, total_pages: 2, total_entries: 186 }
      }
    });

    expect(result.pagination.total).toBe(186);
    expect(result.pagination.page).toBe(1);
  });

  it("falls back to total_count when total_entries is missing", () => {
    const result = presentUsers({ data: { users: [], pagination: { total_count: 9 } } });

    expect(result.pagination.total).toBe(9);
  });

  it("returns a stable empty state for missing data", () => {
    const result = presentUsers({});

    expect(result.users).toEqual([]);
    expect(result.pagination).toEqual({ page: 1, perPage: 0, total: 0 });
  });
});
