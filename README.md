# Twygo Users Lab

Mini app para o workshop de consumo da API Twygo com cruzamento de planilha. A tela lista usuarios via API v2, recebe um CSV de capacitacao e gera tabela + graficos por area, categoria e status do cruzamento.

## Materiais da aula

- `DESAFIO.md`: enunciado do desafio para os alunos.
- `APOSTILA_CONCEITOS.md`: explicacao simples dos conceitos principais, como frontend, backend, API, `.env`, token, CSV, Git e GitHub.
- `GABARITO.md`: passo a passo completo para recriar o sistema com prompts.

## Como usar na aula com Claude ou Codex

Os alunos nao precisam decorar comandos.

Use este prompt no Claude ou Codex:

```text
Prepare este projeto para rodar localmente.
Instale as dependencias, crie o arquivo .env a partir do .env.example e me diga onde devo colar o token da Twygo.
Depois abra o projeto local e me diga qual URL devo acessar no navegador.
Explique tudo em linguagem simples.
```

Depois de colar o token real no `.env`, use:

```text
Abra o projeto local, confira se a API da Twygo respondeu e me diga se esta pronto para anexar o CSV.
```

## Referencia tecnica para instrutor

Estes comandos sao apenas referencia para o Claude/Codex ou para o instrutor.

Instalar dependencias:

```bash
npm install
```

Criar `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Rodar a demo:

```bash
npm run dev
```

Abrir:

```text
http://localhost:5183
```

## CSV de exemplo

Use o arquivo:

```text
public/sample-capacitacao.csv
```

Colunas esperadas:

- `email`
- `area`
- `categoria`
- `curso`
- `horas_capacitacao`
- `status_capacitacao`
- `nota`
- `concluido_em`

## Testes com Claude ou Codex

Use este prompt:

```text
Rode os testes automatizados do projeto e me diga quantos passaram.
Se algum falhar, explique o motivo em linguagem simples.
```

## APIs e cruzamento

O backend local chama:

```text
GET https://api.twygo.com/api/v2/users?page=1&per_page=50
```

O frontend cruza os usuarios da API com o CSV usando `email`.
