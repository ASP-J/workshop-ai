const MAX_PER_PAGE = 100;

export function buildUsersQuery(input = {}) {
  const params = new URLSearchParams();
  const page = positiveNumber(input.page, 1);
  const perPage = Math.min(positiveNumber(input.per_page, 10), MAX_PER_PAGE);

  params.set("page", String(page));
  params.set("per_page", String(perPage));

  for (const key of ["user_id", "name", "email"]) {
    const value = clean(input[key]);
    if (value) params.set(key, value);
  }

  return params;
}

function positiveNumber(value, fallback) {
  const number = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function clean(value) {
  return String(value ?? "").trim();
}
