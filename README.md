# Twygo Users Lab

Mini app para o workshop de consumo da API Twygo com cruzamento de planilha. A tela lista usuarios via API v2, recebe um CSV de capacitacao e gera tabela + graficos por area, categoria e status do cruzamento.

## Importante para alunos

Se voce e aluno, use a branch:

```text
alunos
```

No Claude ou Codex, comece com este prompt:

```text
Clone a branch alunos deste repositorio:
git@github.com:ASP-J/workshop-ai.git

Depois leia o README.md e me guie passo a passo, em linguagem simples.
```

Se o instrutor pedir o link em HTTPS, use:

```text
Clone a branch alunos deste repositorio:
https://github.com/ASP-J/workshop-ai.git

Depois leia o README.md e me guie passo a passo, em linguagem simples.
```

Esta branch `main` contem tambem material de instrutor, incluindo gabarito.

## Materiais da aula

- `DESAFIO.md`: enunciado do desafio para os alunos.
- `APOSTILA_CONCEITOS.md`: explicacao simples dos conceitos principais, como frontend, backend, API, `.env`, token, CSV, Git e GitHub.
- `GABARITO.md`: passo a passo completo para recriar o sistema com prompts.

## O que significa conectar na API da Twygo

Quando o desafio falar em **conectar**, **ligar** ou **chamar** a API da Twygo, significa:

```text
usar o token entregue pelo instrutor para buscar usuarios reais da plataforma Twygo
```

Resumo simples:

1. A Twygo guarda os usuarios.
2. A API e o caminho para buscar esses usuarios.
3. O token e a chave que autoriza essa busca.
4. O backend local usa esse token para falar com a Twygo.
5. A tela mostra os usuarios que vieram dessa busca.

## Como usar na aula com Claude ou Codex

Os alunos nao precisam decorar comandos.

Use este prompt no Claude ou Codex:

```text
Prepare este projeto para rodar localmente.
Instale as dependencias necessarias.
Crie o arquivo .env a partir do .env.example.
Configure o arquivo .env com este token da Twygo:
[cole aqui o token recebido do instrutor]

Salve esse valor na variavel TWYGO_API_TOKEN.
Nao mostre, nao repita e nao imprima meu token na resposta.
No final, apenas confirme que o .env foi configurado.
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
