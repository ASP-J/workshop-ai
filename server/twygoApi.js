import { buildUsersQuery } from "./query.js";

const ALL_PAGES_PER_PAGE = 100;
const MAX_PAGES = 50;

// Privacidade: a API da Twygo devolve muitos dados pessoais (telefone, endereco,
// CEP, documentos...). O painel so usa estes campos, entao o servidor local
// repassa apenas eles para o navegador.
export const PUBLIC_USER_FIELDS = ["user_id", "name", "email", "department", "situation"];

export function projectUser(user = {}) {
  return PUBLIC_USER_FIELDS.reduce((projected, field) => {
    if (user?.[field] !== undefined) projected[field] = user[field];
    return projected;
  }, {});
}

function projectBody(body) {
  const users = body?.data?.users;
  if (!Array.isArray(users)) return body;
  return { ...body, data: { ...body.data, users: users.map(projectUser) } };
}

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

  const body = projectBody(await readJson(response));
  return {
    status: response.status,
    body
  };
}

// Busca TODAS as paginas de usuarios e devolve tudo junto, no mesmo formato
// da API ({ data: { users, pagination }, message }). Assim o cruzamento com o
// CSV enxerga todos os usuarios, e nao so os da primeira pagina.
export async function fetchAllUsers({ filters = {}, token, baseUrl, fetcher = fetch }) {
  const users = [];
  let lastBody = {};

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const result = await fetchUsers({
      filters: { ...filters, page: String(page), per_page: String(ALL_PAGES_PER_PAGE) },
      token,
      baseUrl,
      fetcher
    });

    if (result.status < 200 || result.status >= 300) return result;

    lastBody = result.body ?? {};
    const pageUsers = lastBody?.data?.users ?? [];
    users.push(...pageUsers);

    const totalPages = Number(lastBody?.data?.pagination?.total_pages);
    const reachedEnd = Number.isFinite(totalPages) && totalPages > 0
      ? page >= totalPages
      : pageUsers.length < ALL_PAGES_PER_PAGE;
    if (reachedEnd || pageUsers.length === 0) break;
  }

  const totalEntries = Number(lastBody?.data?.pagination?.total_entries);

  return {
    status: 200,
    body: {
      message: lastBody?.message ?? "",
      data: {
        users,
        pagination: {
          current_page: 1,
          total_pages: 1,
          per_page: users.length,
          total_entries: Number.isFinite(totalEntries) ? totalEntries : users.length
        }
      }
    }
  };
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return { message: "A API retornou uma resposta que nao parece JSON." };
  }
}
