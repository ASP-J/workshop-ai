import { describe, expect, it } from "vitest";
import { parseTrainingCsv } from "./trainingCsv.js";

describe("parseTrainingCsv", () => {
  it("normalizes positive training rows from csv text", () => {
    const records = parseTrainingCsv(`email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
maria@example.com,Tecnologia,Seguranca,LGPD na pratica,8,Concluido,9.4,2026-05-10
joao@example.com,Comercial,Vendas,Playbook comercial,4,Em andamento,8.8,2026-05-12`);

    expect(records).toEqual([
      {
        email: "maria@example.com",
        area: "Tecnologia",
        categoria: "Seguranca",
        curso: "LGPD na pratica",
        horas: 8,
        status: "Concluido",
        nota: 9.4,
        concluidoEm: "2026-05-10"
      },
      {
        email: "joao@example.com",
        area: "Comercial",
        categoria: "Vendas",
        curso: "Playbook comercial",
        horas: 4,
        status: "Em andamento",
        nota: 8.8,
        concluidoEm: "2026-05-12"
      }
    ]);
  });

  it("ignores blank lines and rows without email", () => {
    const records = parseTrainingCsv(`email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
 ,Tecnologia,Produto,Curso sem email,4,Concluido,9,2026-05-01

ana@example.com,Produto,Produto,Mapa de produto,6,Concluido,9.1,2026-05-03`);

    expect(records).toHaveLength(1);
    expect(records[0].email).toBe("ana@example.com");
  });
});
