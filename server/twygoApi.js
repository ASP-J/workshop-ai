import { buildUsersQuery } from "./query.js";

export async function fetchUsers({ filters, token, baseUrl = "https://api.twygo.com", fetcher = fetch }) {
  if (!token) {
    return {
      status: 500,
      body: {
        message: "TWYGO_API_TOKEN nao configurado no servidor local."
      }
    };
  }

  const query = buildUsersQuery(filters);
  const response = await fetcher(`${baseUrl}/api/v2/users?${query.toString()}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const body = await readJson(response);
  return {
    status: response.status,
    body
  };
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return { message: "A API retornou uma resposta que nao parece JSON." };
  }
}
