import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { loadUsers } from "./api.js";
import { barWidthPercent } from "./barWidth.js";
import { buildPieSlices } from "./chartSlices.js";
import { buildTrainingDashboard } from "./trainingDashboard.js";
import { parseTrainingCsv } from "./trainingCsv.js";
import { presentUsers } from "./userPresenter.js";
import "./styles.css";

// all=true: o servidor local busca TODAS as páginas da API Twygo,
// para o cruzamento com o CSV enxergar todos os usuários.
const platformQuery = {
  all: "true"
};

export default function App() {
  const [rawPayload, setRawPayload] = useState(null);
  const [trainingRecords, setTrainingRecords] = useState([]);
  const [csvText, setCsvText] = useState("");
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
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    const text = await file.text();
    applyCsv(text, file.name);
    // reseta o input para reanexar o mesmo arquivo disparar o onChange de novo
    input.value = "";
  }

  async function loadSampleCsv() {
    const response = await fetch("/capacitacao_workshop.csv");
    const text = await response.text();
    applyCsv(text, "capacitacao_workshop.csv");
  }

  function applyCsv(text, fileName) {
    const records = parseTrainingCsv(text);
    setTrainingRecords(records);
    setCsvText(text);
    setCsvName(fileName);
    setCsvStatus(records.length ? "ready" : "empty");
  }

  function reprocessCsv() {
    if (!csvText) return;
    applyCsv(csvText, csvName);
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Workshop Twygo API + CSV</p>
            <h1>Painel de capacitação</h1>
          </div>
          <div className="top-actions">
            <StatusBadge status={status} />
            <button type="button" className="secondary-button" onClick={refreshUsers} disabled={status === "loading"}>
              Recarregar usuários
            </button>
          </div>
        </header>

        {error ? <div className="notice danger">{error}</div> : null}

        <section className="upload-panel" aria-label="Anexar CSV de capacitação">
          <div>
            <p className="eyebrow">Entrada da planilha</p>
            <h2>Anexe o CSV de capacitação</h2>
            <p>
              O cruzamento usa o e-mail como chave entre os usuários da plataforma e a planilha.
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
            <button type="button" className="secondary-button" onClick={reprocessCsv} disabled={!csvText}>
              Atualizar painel
            </button>
          </div>
          <div className={`csv-state ${csvStatus}`}>
            {csvName ? `${csvName} · ${trainingRecords.length} linhas lidas da planilha` : "Nenhum CSV anexado ainda"}
          </div>
        </section>

        <SummaryCards summary={dashboard.summary} />

        <HrSummaryCards summary={dashboard.summary} />

        <section className="charts-grid" aria-label="Gráficos por setor">
          <p className="section-title">Visão por setor (RH)</p>
          <PieChart title="Pessoas por setor" data={dashboard.charts.usersBySector} />
          <BarChart title="Horas por setor" data={dashboard.charts.hoursBySector} suffix="h" />
          <BarChart title="Taxa de conclusão por setor" data={dashboard.charts.completionRateBySector} suffix="%" />
        </section>

        <section className="charts-grid" aria-label="Gráficos de capacitação">
          <PieChart title="Concluiu x não concluiu" data={dashboard.charts.completionCount} />
          <PieChart title="Horas por área" data={dashboard.charts.hoursByArea} suffix="h" />
          <PieChart title="Usuários por categoria" data={dashboard.charts.usersByCategory} />
          <BarChart title="Top cursos por horas" data={dashboard.charts.topCourses} suffix="h" />
        </section>

        <section className="table-panel" aria-label="Usuários cruzados com CSV">
          <div className="table-header">
            <div>
              <h2>Usuários + capacitação</h2>
              <p>
                {presented.users.length} usuários da plataforma · {dashboard.summary.totalHours} horas cruzadas
              </p>
            </div>
          </div>

          <TrainingTable rows={dashboard.rows} status={status} />
        </section>
      </section>
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
    <section className="summary-grid" aria-label="Resumo de capacitação">
      <MetricCard label="Usuários na tela" value={summary.totalUsers} />
      <MetricCard label="Concluíram" value={summary.usersCompleted} />
      <MetricCard label="Não concluíram" value={summary.usersNotCompleted} />
      <MetricCard label="Horas totais" value={`${summary.totalHours}h`} />
      <MetricCard label="Cobertura" value={`${summary.coveragePercent}%`} />
    </section>
  );
}

function HrSummaryCards({ summary }) {
  return (
    <section className="summary-grid" aria-label="Indicadores de RH">
      <MetricCard label="Taxa de conclusão" value={`${summary.completionRate}%`} />
      <MetricCard label="Horas por pessoa" value={`${summary.hoursPerUser}h`} />
      <MetricCard label="Nota média" value={summary.averageScore || "-"} />
      <MetricCard label="Setores" value={summary.sectorsCount} />
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
                <div className="bar-fill" style={{ width: `${barWidthPercent(item.value, max)}%` }} />
              </div>
              <strong>
                {item.value}
                {suffix}
              </strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty small">Anexe o CSV para gerar este gráfico.</div>
      )}
    </article>
  );
}

function PieChart({ title, data, suffix = "" }) {
  const slices = buildPieSlices(data);
  const background = slices.length ? `conic-gradient(${slices.map((slice) => slice.stop).join(", ")})` : "#edf4f0";

  return (
    <article className="chart-card pie-card">
      <h2>{title}</h2>
      {slices.length ? (
        <div className="pie-layout">
          <div className="donut" style={{ background }} aria-hidden="true">
            <div>
              <strong>{data.reduce((total, item) => total + Number(item.value ?? 0), 0)}</strong>
              <span>Total</span>
            </div>
          </div>
          <div className="legend">
            {slices.map((slice) => (
              <div className="legend-row" key={slice.label}>
                <i style={{ backgroundColor: slice.color }} />
                <span>{slice.label}</span>
                <strong>
                  {slice.value}
                  {suffix}
                </strong>
                <em>{slice.percent}%</em>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty small">Anexe o CSV para gerar este gráfico.</div>
      )}
    </article>
  );
}

function completionClass(completionStatus) {
  if (completionStatus === "Concluiu") return "matched";
  if (completionStatus === "Parcial") return "partial";
  return "missing";
}

function TrainingTable({ rows, status }) {
  if (status === "loading") {
    return <div className="empty">Carregando usuários da plataforma...</div>;
  }

  if (!rows.length) {
    return <div className="empty">Nenhum usuário retornou da plataforma.</div>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Setor</th>
            <th>Área</th>
            <th>Categorias</th>
            <th>Horas</th>
            <th>Nota média</th>
            <th>Cursos</th>
            <th>Conclusão</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.id}-${row.email}`}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.sector}</td>
              <td>{row.area}</td>
              <td>{row.categories}</td>
              <td>{row.hours}h</td>
              <td>{row.averageScore || "-"}</td>
              <td>{row.courses}</td>
              <td>
                <span className={`match-pill ${completionClass(row.completionStatus)}`}>
                  {row.completionStatus}
                </span>
                {row.totalCourses ? (
                  <small className="completion-count">
                    {row.completedCourses}/{row.totalCourses} cursos
                  </small>
                ) : null}
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
