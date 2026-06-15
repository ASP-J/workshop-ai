import { describe, expect, it, vi } from "vitest";
import { loadUsers } from "./api.js";

describe("loadUsers", () => {
  it("calls the local backend with only filled filters", async () => {
    const fetcher = vi.fn(async () => ({
      ok: true,
      json: async () => ({ message: "success", data: { users: [] } })
    }));

    await loadUsers({ page: 1, per_page: 10, name: " Joao ", email: "" }, fetcher);

    expect(fetcher).toHaveBeenCalledWith("/api/users?page=1&per_page=10&name=Joao");
  });

  it("throws the backend message when the local request fails", async () => {
    const fetcher = vi.fn(async () => ({
      ok: false,
      json: async () => ({ message: "Token ausente" })
    }));

    await expect(loadUsers({ page: 1 }, fetcher)).rejects.toThrow("Token ausente");
  });
});
