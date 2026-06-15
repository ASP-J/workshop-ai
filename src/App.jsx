import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { loadUsers } from "./api.js";
import { buildTrainingDashboard } from "./trainingDashboard.js";
import { parseTrainingCsv } from "./trainingCsv.js";
import { presentUsers } from "./userPresenter.js";
import "./styles.css";

const platformQuery = {
  page: "1",
  per_page: "50"
};

export default function App() {
  const [rawPayload, setRawPayload] = useState(null);
  const [trainingRecords, setTrainingRecords] = useState([]);
  const [csvName, setCsvName] = useState("");
  const [status, setStatus] = useState("idle");
  const [csvStatus, setCsvStatus] = useState("empty");
  const [error, setError] = useState("");

  const presented = useMemo(() => presentUsers(rawPayload), [rawPayload]);
  const dashboard = useMemo(
    () => buildTrainingDashboard(presented.users, trainingRecords),
    [presented.users, trainingRecords]
  );

  useEffect(() => {
    refreshUsers();
  }, []);

  async function refreshUsers() {
    setStatus("loading");
    setError("");

    try {
      const payload = await loadUsers(platformQuery);
      setRawPayload(payload);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function uploadCsv(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    applyCsv(text, file.name);
  }

  async function loadSampleCsv() {
    const response = await fetch("/sample-capacitacao.csv");
    const text = await response.text();
    applyCsv(text, "sample-capacitacao.csv");
  }

  function applyCsv(text, fileName) {
    const records = parseTrainingCsv(text);
    setTrainingRecords(records);
    setCsvName(fileName);
    setCsvStatus(records.length ? "ready" : "empty");
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Workshop Twygo API + CSV</p>
            <h1>Painel de capacitacao</h1>
          </div>
          <div className="top-actions">
            <StatusBadge status={status} />
            <button type="button" className="secondary-button" onClick={refreshUsers} disabled={status === "loading"}>
              Recarregar usuarios
            </button>
          </div>
        </header>

        {error ? <div className="notice danger">{error}</div> : null}

        <section className="upload-panel" aria-label="Anexar CSV de capacitacao">
          <div>
            <p className="eyebrow">Entrada da planilha</p>
            <h2>Anexe o CSV de capacitacao</h2>
            <p>
              O cruzamento usa o email como chave entre os usuarios da plataforma e a planilha.
            </p>
          </div>
          <div className="upload-actions">
            <label className="file-button">
              Anexar CSV
              <input type="file" accept=".csv,text/csv" onChange={uploadCsv} />
            </label>
            <button type="button" className="secondary-button" onClick={loadSampleCsv}>
              Usar CSV exemplo
            </button>
          </div>
          <div className={`csv-state ${csvStatus}`}>
            {csvName ? `${csvName} · ${trainingRecords.length} linhas positivas` : "Nenhum CSV anexado ainda"}
          </div>
        </section>

        <SummaryCards summary={dashboard.summary} />

        <section className="charts-grid" aria-label="Graficos de capacitacao">
          <BarChart title="Horas por area" data={dashboard.charts.hoursByArea} suffix="h" />
          <BarChart title="Usuarios por categoria" data={dashboard.charts.usersByCategory} />
          <BarChart title="Situacao do cruzamento" data={dashboard.charts.statusCount} />
          <BarChart title="Top cursos por horas" data={dashboard.charts.topCourses} suffix="h" />
        </section>

        <section className="table-panel" aria-label="Usuarios cruzados com CSV">
          <div className="table-header">
            <div>
              <h2>Usuarios + capacitacao</h2>
              <p>
                {presented.users.length} usuarios da plataforma · {dashboard.summary.totalHours} horas cruzadas
              </p>
            </div>
          </div>

          <TrainingTable rows={dashboard.rows} status={status} />
        </section>
      </section>

      <aside className="explain-panel">
        <p className="eyebrow">O que esta tela ensina</p>
        <h2>API + planilha = painel</h2>
        <ol>
          <li>O app busca usuarios na API Twygo.</li>
          <li>O aluno anexa um CSV de capacitacao.</li>
          <li>O sistema cruza tudo pelo email.</li>
          <li>Cards, tabela e graficos nascem do cruzamento.</li>
        </ol>
        <div className="endpoint">
          <span>GET</span>
          <code>/api/v2/users + sample-capacitacao.csv</code>
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

function SummaryCards({ summary }) {
  return (
    <section className="summary-grid" aria-label="Resumo de capacitacao">
      <MetricCard label="Usuarios na tela" value={summary.totalUsers} />
      <MetricCard label="Com capacitacao" value={summary.usersWithTraining} />
      <MetricCard label="Horas totais" value={`${summary.totalHours}h`} />
      <MetricCard label="Cobertura" value={`${summary.coveragePercent}%`} />
    </section>
  );
}

function MetricCard({ label, value }) {
  return (
    <article className="metric-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}

function BarChart({ title, data, suffix = "" }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <article className="chart-card">
      <h2>{title}</h2>
      {data.length ? (
        <div className="bars">
          {data.map((item) => (
            <div className="bar-row" key={item.label}>
              <span>{item.label}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${Math.max(8, (item.value / max) * 100)}%` }} />
              </div>
              <strong>
                {item.value}
                {suffix}
              </strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty small">Anexe o CSV para gerar este grafico.</div>
      )}
    </article>
  );
}

function TrainingTable({ rows, status }) {
  if (status === "loading") {
    return <div className="empty">Carregando usuarios da plataforma...</div>;
  }

  if (!rows.length) {
    return <div className="empty">Nenhum usuario retornou da plataforma.</div>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Area</th>
            <th>Categorias</th>
            <th>Horas</th>
            <th>Nota media</th>
            <th>Cursos</th>
            <th>Cruzamento</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.id}-${row.email}`}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.area}</td>
              <td>{row.categories}</td>
              <td>{row.hours}h</td>
              <td>{row.averageScore || "-"}</td>
              <td>{row.courses}</td>
              <td>
                <span className={`match-pill ${row.hours ? "matched" : "missing"}`}>{row.trainingStatus}</span>
              </td>
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
