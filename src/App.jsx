import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { loadUsers } from "./api.js";
import { presentUsers } from "./userPresenter.js";
import "./styles.css";

const initialFilters = {
  page: "1",
  per_page: "10",
  name: "",
  email: "",
  user_id: ""
};

export default function App() {
  const [filters, setFilters] = useState(initialFilters);
  const [rawPayload, setRawPayload] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const presented = useMemo(() => presentUsers(rawPayload), [rawPayload]);

  useEffect(() => {
    refresh(initialFilters);
  }, []);

  async function refresh(nextFilters = filters) {
    setStatus("loading");
    setError("");

    try {
      const payload = await loadUsers(nextFilters);
      setRawPayload(payload);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  function updateFilter(event) {
    setFilters((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  function submit(event) {
    event.preventDefault();
    refresh({ ...filters, page: "1" });
    setFilters((current) => ({ ...current, page: "1" }));
  }

  function goToPage(offset) {
    const nextPage = Math.max(1, Number(filters.page || "1") + offset);
    const nextFilters = { ...filters, page: String(nextPage) };
    setFilters(nextFilters);
    refresh(nextFilters);
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Workshop Twygo API</p>
            <h1>Twygo Users Lab</h1>
          </div>
          <StatusBadge status={status} />
        </header>

        <form className="filters" onSubmit={submit}>
          <label>
            Nome
            <input name="name" value={filters.name} onChange={updateFilter} placeholder="Buscar por nome" />
          </label>
          <label>
            Email
            <input name="email" value={filters.email} onChange={updateFilter} placeholder="usuario@empresa.com" />
          </label>
          <label>
            ID
            <input name="user_id" value={filters.user_id} onChange={updateFilter} placeholder="123" />
          </label>
          <label>
            Por pagina
            <select name="per_page" value={filters.per_page} onChange={updateFilter}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </label>
          <button type="submit">Consultar</button>
        </form>

        {error ? <div className="notice danger">{error}</div> : null}

        <section className="table-panel" aria-label="Usuarios da API Twygo">
          <div className="table-header">
            <div>
              <h2>Usuarios</h2>
              <p>
                Pagina {presented.pagination.page} · {presented.pagination.total} registros encontrados
              </p>
            </div>
            <div className="pager">
              <button type="button" onClick={() => goToPage(-1)} disabled={status === "loading" || filters.page === "1"}>
                Anterior
              </button>
              <button type="button" onClick={() => goToPage(1)} disabled={status === "loading"}>
                Proxima
              </button>
            </div>
          </div>

          <UserTable users={presented.users} status={status} />
        </section>
      </section>

      <aside className="explain-panel">
        <p className="eyebrow">O que esta tela ensina</p>
        <h2>Da collection para o app</h2>
        <ol>
          <li>O front chama apenas o servidor local.</li>
          <li>O servidor adiciona o Bearer token.</li>
          <li>A API v2 retorna usuarios e paginacao.</li>
          <li>A tela transforma o JSON em uma tabela legivel.</li>
        </ol>
        <div className="endpoint">
          <span>GET</span>
          <code>/api/v2/users</code>
        </div>
      </aside>
    </main>
  );
}

function StatusBadge({ status }) {
  const labels = {
    idle: "Pronto",
    loading: "Consultando",
    ready: "API conectada",
    error: "Verificar API"
  };

  return <span className={`status ${status}`}>{labels[status]}</span>;
}

function UserTable({ users, status }) {
  if (status === "loading") {
    return <div className="empty">Carregando usuarios da API...</div>;
  }

  if (!users.length) {
    return <div className="empty">Nenhum usuario retornou para estes filtros.</div>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={`${user.id}-${user.email}`}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cpf}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
