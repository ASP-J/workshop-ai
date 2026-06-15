export async function loadUsers(filters, fetcher = fetch) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    const text = String(value ?? "").trim();
    if (text) query.set(key, text);
  }

  const response = await fetcher(`/api/users?${query.toString()}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Nao foi possivel carregar usuarios.");
  }

  return payload;
}
