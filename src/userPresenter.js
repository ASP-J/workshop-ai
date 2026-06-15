export function presentUsers(payload) {
  const users = payload?.data?.users ?? [];
  const pagination = payload?.data?.pagination ?? {};

  return {
    users: users.map((user) => ({
      id: value(user.user_id ?? user.id),
      name: joinName(user.name, user.first_name, user.last_name),
      email: value(user.email),
      cpf: value(user.cpf),
      status: value(user.status ?? user.situation ?? user.active)
    })),
    pagination: {
      page: Number(pagination.page ?? pagination.current_page ?? 1),
      perPage: Number(pagination.per_page ?? pagination.perPage ?? users.length),
      total: Number(pagination.total ?? pagination.total_count ?? users.length)
    },
    message: payload?.message ?? ""
  };
}

function joinName(name, firstName, lastName) {
  const readyName = value(name);
  if (readyName !== "-") return readyName;
  return [firstName, lastName].map(value).filter((part) => part !== "-").join(" ") || "-";
}

function value(input) {
  if (input === true) return "Ativo";
  if (input === false) return "Inativo";
  const text = String(input ?? "").trim();
  return text || "-";
}
