import { describe, expect, it } from "vitest";
import { buildTrainingDashboard } from "./trainingDashboard.js";

const users = [
  { id: "1", name: "Ana Lima", email: "ana@example.com", status: "active", sector: "Produto" },
  { id: "2", name: "Bruno Reis", email: "bruno@example.com", status: "active", sector: "Comercial" },
  { id: "3", name: "Carla Souza", email: "carla@example.com", status: "inactive", sector: "Suporte" }
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
        sector: "Produto",
        area: "Produto",
        categories: "Lideranca, Produto",
        courses: "Discovery continuo, Mentoria de lideres",
        hours: 12,
        averageScore: 9.45,
        trainingStatus: "Com dados",
        completedCourses: 2,
        totalCourses: 2,
        completionStatus: "Concluiu"
      },
      {
        id: "2",
        name: "Bruno Reis",
        email: "bruno@example.com",
        platformStatus: "active",
        sector: "Comercial",
        area: "Comercial",
        categories: "Vendas",
        courses: "Playbook comercial",
        hours: 6,
        averageScore: 8.8,
        trainingStatus: "Com dados",
        completedCourses: 0,
        totalCourses: 1,
        completionStatus: "Nao concluiu"
      },
      {
        id: "3",
        name: "Carla Souza",
        email: "carla@example.com",
        platformStatus: "inactive",
        sector: "Suporte",
        area: "-",
        categories: "-",
        courses: "-",
        hours: 0,
        averageScore: 0,
        trainingStatus: "Sem dados no CSV",
        completedCourses: 0,
        totalCourses: 0,
        completionStatus: "Sem dados no CSV"
      }
    ]);
    expect(dashboard.unmatchedCsvEmails).toEqual(["fora@example.com"]);
  });

  it("builds positive summary cards and chart datasets", () => {
    const dashboard = buildTrainingDashboard(users, records);

    expect(dashboard.summary).toEqual({
      totalUsers: 3,
      usersWithTraining: 2,
      usersCompleted: 1,
      usersNotCompleted: 1,
      totalHours: 18,
      averageHours: 9,
      coveragePercent: 67,
      completionRate: 50,
      hoursPerUser: 9,
      averageScore: 9.13,
      sectorsCount: 3
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
    expect(dashboard.charts.completionCount).toEqual([
      { label: "Concluiu", value: 1 },
      { label: "Nao concluiu", value: 1 }
    ]);
  });

  it("aggregates HR views by sector without changing email matching", () => {
    const dashboard = buildTrainingDashboard(users, records);

    expect(dashboard.charts.usersBySector).toEqual([
      { label: "Comercial", value: 1 },
      { label: "Produto", value: 1 },
      { label: "Suporte", value: 1 }
    ]);
    expect(dashboard.charts.hoursBySector).toEqual([
      { label: "Produto", value: 12 },
      { label: "Comercial", value: 6 },
      { label: "Suporte", value: 0 }
    ]);
    expect(dashboard.charts.completionRateBySector).toEqual([
      { label: "Produto", value: 100 },
      { label: "Comercial", value: 0 }
    ]);
    // email match unchanged: fora@example.com stays unmatched
    expect(dashboard.unmatchedCsvEmails).toEqual(["fora@example.com"]);
  });

  it("classifies partial completion when only some courses are concluded", () => {
    const partialUser = [{ id: "9", name: "Duda", email: "duda@example.com", status: "active" }];
    const partialRecords = [
      { email: "duda@example.com", area: "RH", categoria: "Cultura", curso: "Onboarding", horas: 4, status: "Concluido", nota: 9, concluidoEm: "2026-05-01" },
      { email: "duda@example.com", area: "RH", categoria: "Cultura", curso: "Processos", horas: 2, status: "Em andamento", nota: 0, concluidoEm: "" }
    ];

    const dashboard = buildTrainingDashboard(partialUser, partialRecords);

    expect(dashboard.rows[0].completionStatus).toBe("Parcial");
    expect(dashboard.rows[0].completedCourses).toBe(1);
    expect(dashboard.rows[0].totalCourses).toBe(2);
    expect(dashboard.summary.usersCompleted).toBe(0);
    expect(dashboard.summary.usersNotCompleted).toBe(1);
  });
});
