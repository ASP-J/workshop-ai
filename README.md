# Twygo Users Lab

Mini app para o workshop de consumo da API Twygo com cruzamento de planilha. A tela lista usuarios via API v2, recebe um CSV de capacitacao e gera tabela + graficos por area, categoria e status do cruzamento.

## Rodar local

1. Instale dependencias:

```bash
npm install
```

2. Crie `.env` a partir do exemplo:

```bash
cp .env.example .env
```

3. Preencha `TWYGO_API_TOKEN` com o Bearer token da tela de integracoes.

4. Rode a demo:

```bash
npm run dev
```

5. Abra:

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

## Testes

```bash
npm test
```

## APIs e cruzamento

O backend local chama:

```text
GET https://api.twygo.com/api/v2/users?page=1&per_page=50
```

O frontend cruza os usuarios da API com o CSV usando `email`.
