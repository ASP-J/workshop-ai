import { describe, expect, it, vi } from "vitest";
import { loadUsers, SERVER_OFFLINE_MESSAGE } from "./api.js";

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

  it("explains in plain language when the local backend is not running", async () => {
    const fetcher = vi.fn(async () => ({
      ok: false,
      json: async () => {
        throw new SyntaxError("Unexpected end of JSON input");
      }
    }));

    await expect(loadUsers({ page: 1 }, fetcher)).rejects.toThrow(SERVER_OFFLINE_MESSAGE);
  });

  it("explains in plain language when the request itself fails", async () => {
    const fetcher = vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    });

    await expect(loadUsers({ page: 1 }, fetcher)).rejects.toThrow(SERVER_OFFLINE_MESSAGE);
  });
});
