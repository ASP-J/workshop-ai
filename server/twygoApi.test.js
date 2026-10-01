import { describe, expect, it, vi } from "vitest";
import { fetchAllUsers, fetchUsers, projectUser } from "./twygoApi.js";

describe("fetchUsers", () => {
  it("calls Twygo users endpoint with bearer auth and sanitized query", async () => {
    const fetcher = vi.fn(async () => ({
      status: 200,
      json: async () => ({ message: "success", data: { users: [], pagination: {} } })
    }));

    const result = await fetchUsers({
      token: "secret",
      baseUrl: "https://api.example.test",
      filters: { page: "2", per_page: "25", name: " Ana " },
      fetcher
    });

    expect(result.status).toBe(200);
    expect(fetcher).toHaveBeenCalledWith(
      "https://api.example.test/api/v2/users?page=2&per_page=25&name=Ana",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer secret"
        }
      }
    );
  });

  it("does not call the API when the token is missing", async () => {
    const fetcher = vi.fn();

    const result = await fetchUsers({ token: "", filters: {}, fetcher });

    expect(result.status).toBe(500);
    expect(result.body.message).toContain("TWYGO_API_TOKEN");
    expect(fetcher).not.toHaveBeenCalled();
  });
});

describe("fetchAllUsers", () => {
  function pageResponse(users, pagination) {
    return { status: 200, json: async () => ({ message: "success", data: { users, pagination } }) };
  }

  it("aggregates every page using total_pages", async () => {
    const fetcher = vi.fn(async (url) => {
      const page = Number(new URL(url).searchParams.get("page"));
      const users = page === 1 ? [{ user_id: 1 }, { user_id: 2 }] : page === 2 ? [{ user_id: 3 }] : [];
      return pageResponse(users, { current_page: page, total_pages: 2, total_entries: 3 });
    });

    const result = await fetchAllUsers({ token: "secret", baseUrl: "https://api.example.test", fetcher });

    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[0][0]).toBe("https://api.example.test/api/v2/users?page=1&per_page=100");
    expect(fetcher.mock.calls[1][0]).toBe("https://api.example.test/api/v2/users?page=2&per_page=100");
    expect(result.status).toBe(200);
    expect(result.body.data.users.map((user) => user.user_id)).toEqual([1, 2, 3]);
    expect(result.body.data.pagination.total_entries).toBe(3);
  });

  it("stops when a page comes back short if total_pages is missing", async () => {
    const fullPage = Array.from({ length: 100 }, (_, index) => ({ user_id: index }));
    const fetcher = vi.fn(async (url) => {
      const page = Number(new URL(url).searchParams.get("page"));
      return pageResponse(page === 1 ? fullPage : [{ user_id: 999 }], {});
    });

    const result = await fetchAllUsers({ token: "secret", fetcher });

    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(result.body.data.users).toHaveLength(101);
    expect(result.body.data.pagination.total_entries).toBe(101);
  });

  it("returns the API error as-is when a page fails", async () => {
    const fetcher = vi.fn(async () => ({ status: 401, json: async () => ({ message: "unauthorized" }) }));

    const result = await fetchAllUsers({ token: "secret", fetcher });

    expect(result.status).toBe(401);
    expect(result.body.message).toBe("unauthorized");
  });
});

describe("projectUser (privacidade)", () => {
  const fullUser = {
    user_id: 7,
    name: "Pessoa Teste",
    email: "pessoa@example.test",
    department: "RH",
    situation: "active",
    phone: "41 0000-0000",
    cell_phone: "41 90000-0000",
    document_1: "000.000.000-00",
    cep: "00000-000",
    address: "Rua X",
    city: "Cidade",
    spaces: [{ id: 1 }]
  };

  it("keeps only the fields the panel uses", () => {
    expect(projectUser(fullUser)).toEqual({
      user_id: 7,
      name: "Pessoa Teste",
      email: "pessoa@example.test",
      department: "RH",
      situation: "active"
    });
  });

  it("strips personal data from fetchUsers and fetchAllUsers but keeps pagination", async () => {
    const pagination = { current_page: 1, total_pages: 1, total_entries: 1 };
    const fetcher = vi.fn(async () => ({
      status: 200,
      json: async () => ({ message: "success", data: { users: [fullUser], pagination } })
    }));

    const single = await fetchUsers({ token: "secret", filters: {}, fetcher });
    expect(Object.keys(single.body.data.users[0]).sort()).toEqual(["department", "email", "name", "situation", "user_id"]);
    expect(single.body.data.pagination).toEqual(pagination);

    const all = await fetchAllUsers({ token: "secret", fetcher });
    expect(all.body.data.users[0]).not.toHaveProperty("phone");
    expect(all.body.data.users[0]).not.toHaveProperty("document_1");
    expect(all.body.data.pagination.total_entries).toBe(1);
  });
});
