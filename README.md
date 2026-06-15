# Twygo Users Lab

Mini app para o workshop de consumo da API Twygo. A tela lista usuarios via API v2 usando um servidor local para proteger o Bearer token.

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

## Testes

```bash
npm test
```

## API usada

O backend local chama:

```text
GET https://api.twygo.com/api/v2/users
```

Filtros enviados pela tela:

- `page`
- `per_page`
- `user_id`
- `name`
- `email`
