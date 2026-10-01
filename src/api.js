export const SERVER_OFFLINE_MESSAGE =
  "Não consegui falar com o servidor local (localhost:5184). Peça ao Claude: \"rode o projeto com npm run dev e confira se o backend subiu\".";

export async function loadUsers(filters, fetcher = fetch) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    const text = String(value ?? "").trim();
    if (text) query.set(key, text);
  }

  let response;
  try {
    response = await fetcher(`/api/users?${query.toString()}`);
  } catch {
    throw new Error(SERVER_OFFLINE_MESSAGE);
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    // Resposta vazia ou HTML: o backend não está rodando (o proxy do Vite não achou a porta 5184).
    throw new Error(SERVER_OFFLINE_MESSAGE);
  }

  if (!response.ok) {
    throw new Error(payload.message || "Não foi possível carregar os usuários.");
  }

  return payload;
}
