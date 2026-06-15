# Gabarito - Desafio Twygo Users Lab

## Objetivo

Criar uma tela local que consulta usuarios da Twygo via API v2, recebe uma planilha CSV de capacitacao, cruza as duas fontes por email e gera uma visao positiva com tabela, cards e graficos.

## Prompt sugerido para os participantes

```text
Cria um sistema em React rodando local que consome a API v2 da Twygo para listar usuarios.
Tambem permita anexar um CSV de capacitacao com email, area, categoria, curso, horas, status, nota e data.
Cruze os usuarios da API com o CSV pelo email e gere cards, tabela e graficos por area e categoria.
Use um backend local para guardar o Bearer token.
```

## Passo a passo esperado

1. Criar um projeto React com Vite.
2. Criar um servidor local Node/Express.
3. Guardar o token em `.env`, nunca dentro do `src/`.
4. Criar uma rota local `GET /api/users`.
5. Fazer essa rota chamar `GET https://api.twygo.com/api/v2/users?page=1&per_page=50`.
6. Enviar o header `Authorization: Bearer <token>`.
7. No frontend, chamar apenas `/api/users`.
8. Criar um campo para anexar CSV.
9. Ler e normalizar as colunas do CSV.
10. Cruzar API + CSV usando `email`.
11. Gerar cards de resumo.
12. Gerar graficos por area, categoria, status do cruzamento e top cursos.

## CSV esperado

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
karin.rosario@twygo.com,Produto,Lideranca,Lideranca colaborativa,12,Concluido,9.7,2026-05-06
```

O projeto ja inclui um arquivo pronto:

```text
public/sample-capacitacao.csv
```

## Como conferir se esta certo

- A tela abre em `http://localhost:5183`.
- A API carrega usuarios automaticamente.
- O botao `Usar CSV exemplo` gera cards e graficos.
- Anexar o CSV manualmente gera o mesmo tipo de cruzamento.
- A tabela mostra horas, area, categoria, cursos e status do cruzamento.
- O token nao aparece no DevTools do frontend nem em arquivos dentro de `src/`.
- O backend local responde em `http://localhost:5184/health`.
- `npm test` passa.

## Erros comuns

- Usar a doc da API 1.0 em vez da collection Twygo 2.0.
- Chamar o dominio customizado da organizacao em vez de `https://api.twygo.com`.
- Esquecer o prefixo `Bearer`.
- Colocar o token direto no React.
- Tentar cruzar por nome em vez de email.
- Usar CSV sem cabecalho.
- Criar dados negativos, vazios ou sem categoria e prejudicar os graficos.
- Testar `POST` ou `PUT` em producao durante o workshop.

## Resposta esperada

Arquitetura:

```text
React -> /api/users no servidor local -> https://api.twygo.com/api/v2/users
React -> CSV anexado -> cruzamento por email -> cards + tabela + graficos
```

Principais calculos:

- Total de usuarios carregados da plataforma.
- Usuarios com dados de capacitacao no CSV.
- Soma de horas de capacitacao.
- Percentual de cobertura do CSV.
- Horas por area.
- Usuarios por categoria.
- Top cursos por horas.

Observacao: os dados do CSV de exemplo sao positivos e pensados para apresentacao em treinamento.
