import { describe, expect, it, vi } from "vitest";
import { fetchUsers } from "./twygoApi.js";

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
