import { describe, expect, it } from "vitest";
import { buildTrainingDashboard } from "./trainingDashboard.js";

const users = [
  { id: "1", name: "Ana Lima", email: "ana@example.com", status: "active" },
  { id: "2", name: "Bruno Reis", email: "bruno@example.com", status: "active" },
  { id: "3", name: "Carla Souza", email: "carla@example.com", status: "inactive" }
];

const records = [
  {
    email: "ana@example.com",
    area: "Produto",
    categoria: "Produto",
    curso: "Discovery continuo",
    horas: 8,
    status: "Concluido",
    nota: 9.2,
    concluidoEm: "2026-05-01"
  },
  {
    email: "ana@example.com",
    area: "Produto",
    categoria: "Lideranca",
    curso: "Mentoria de lideres",
    horas: 4,
    status: "Concluido",
    nota: 9.7,
    concluidoEm: "2026-05-08"
  },
  {
    email: "bruno@example.com",
    area: "Comercial",
    categoria: "Vendas",
    curso: "Playbook comercial",
    horas: 6,
    status: "Em andamento",
    nota: 8.8,
    concluidoEm: "2026-05-09"
  },
  {
    email: "fora@example.com",
    area: "Suporte",
    categoria: "Atendimento",
    curso: "Jornada do cliente",
    horas: 3,
    status: "Concluido",
    nota: 9,
    concluidoEm: "2026-05-10"
  }
];

describe("buildTrainingDashboard", () => {
  it("crosses platform users with csv records by email", () => {
    const dashboard = buildTrainingDashboard(users, records);

    expect(dashboard.rows).toEqual([
      {
        id: "1",
        name: "Ana Lima",
        email: "ana@example.com",
        platformStatus: "active",
        area: "Produto",
        categories: "Lideranca, Produto",
        courses: "Discovery continuo, Mentoria de lideres",
        hours: 12,
        averageScore: 9.45,
        trainingStatus: "Com dados"
      },
      {
        id: "2",
        name: "Bruno Reis",
        email: "bruno@example.com",
        platformStatus: "active",
        area: "Comercial",
        categories: "Vendas",
        courses: "Playbook comercial",
        hours: 6,
        averageScore: 8.8,
        trainingStatus: "Com dados"
      },
      {
        id: "3",
        name: "Carla Souza",
        email: "carla@example.com",
        platformStatus: "inactive",
        area: "-",
        categories: "-",
        courses: "-",
        hours: 0,
        averageScore: 0,
        trainingStatus: "Sem dados no CSV"
      }
    ]);
    expect(dashboard.unmatchedCsvEmails).toEqual(["fora@example.com"]);
  });

  it("builds positive summary cards and chart datasets", () => {
    const dashboard = buildTrainingDashboard(users, records);

    expect(dashboard.summary).toEqual({
      totalUsers: 3,
      usersWithTraining: 2,
      totalHours: 18,
      averageHours: 9,
      coveragePercent: 67
    });
    expect(dashboard.charts.hoursByArea).toEqual([
      { label: "Produto", value: 12 },
      { label: "Comercial", value: 6 }
    ]);
    expect(dashboard.charts.usersByCategory).toEqual([
      { label: "Lideranca", value: 1 },
      { label: "Produto", value: 1 },
      { label: "Vendas", value: 1 }
    ]);
    expect(dashboard.charts.statusCount).toEqual([
      { label: "Com dados", value: 2 },
      { label: "Sem dados no CSV", value: 1 }
    ]);
  });
});
