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
        cpf: "-",
        status: "Ativo"
      }
    ]);
    expect(result.pagination.total).toBe(42);
  });

  it("returns a stable empty state for missing data", () => {
    const result = presentUsers({});

    expect(result.users).toEqual([]);
    expect(result.pagination).toEqual({ page: 1, perPage: 0, total: 0 });
  });
});
