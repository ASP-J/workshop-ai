# Gabarito - Desafio Twygo Users Lab

## Objetivo

Criar uma tela local que consulta usuarios da Twygo via API v2 e apresenta o resultado em uma tabela, sem expor o Bearer token no frontend.

## Prompt sugerido para os participantes

```text
Cria um sistema em React rodando local que consome a API v2 da Twygo para listar usuarios.
Use um backend local para guardar o Bearer token, crie filtros por nome, email e ID, mostre paginacao e trate estados de carregando, erro e lista vazia.
```

## Passo a passo esperado

1. Criar um projeto React com Vite.
2. Criar um servidor local Node/Express.
3. Guardar o token em `.env`, nunca dentro do `src/`.
4. Criar uma rota local `GET /api/users`.
5. Fazer essa rota chamar `GET https://api.twygo.com/api/v2/users`.
6. Enviar o header `Authorization: Bearer <token>`.
7. No frontend, chamar apenas `/api/users`.
8. Transformar o JSON da API em linhas de tabela.
9. Criar filtros para `name`, `email` e `user_id`.
10. Criar paginacao usando `page` e `per_page`.

## Como conferir se esta certo

- A tela abre em `http://localhost:5183`.
- A primeira consulta retorna usuarios sem precisar clicar em nada.
- Buscar por nome ou email refaz a consulta.
- O token nao aparece no DevTools do frontend nem em arquivos dentro de `src/`.
- O backend local responde em `http://localhost:5184/health`.
- `npm test` passa.

## Erros comuns

- Usar a doc da API 1.0 em vez da collection Twygo 2.0.
- Chamar o dominio customizado da organizacao em vez de `https://api.twygo.com`.
- Esquecer o prefixo `Bearer`.
- Colocar o token direto no React.
- Enviar `per_page` muito alto e deixar a chamada lenta.
- Testar `POST` ou `PUT` em producao durante o workshop.

## Resposta esperada

Arquitetura:

```text
React -> /api/users no servidor local -> https://api.twygo.com/api/v2/users
```

Contrato da rota local:

```http
GET /api/users?page=1&per_page=10&name=ana
```

Resposta esperada:

```json
{
  "message": "success",
  "data": {
    "users": [],
    "pagination": {}
  }
}
```

Observacao: a lista acima e apenas o formato esperado. O conteudo real depende dos dados da organizacao.
