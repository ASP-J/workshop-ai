# Twygo Users Lab - Design

## Proposito

Demo de workshop para mostrar como sair de uma collection Postman e chegar em uma tela React consumindo a API de usuarios da Twygo.

## Decisoes

- Usar API real apenas com `GET /api/v2/users`.
- Manter o Bearer token no backend local via `.env`.
- Evitar operacoes destrutivas ou que mudem dados.
- Mostrar filtros equivalentes aos parametros do Postman: `page`, `per_page`, `user_id`, `name`, `email`.
- Usar visual de ferramenta de trabalho: filtros no topo, tabela no centro e explicacao lateral curta.

## Fluxo

```text
Usuario abre a tela
  -> React chama /api/users
  -> Express adiciona Authorization: Bearer
  -> API Twygo retorna JSON
  -> React normaliza e mostra tabela
```

## Testes

- Query builder do backend.
- Cliente local do backend.
- Cliente do frontend.
- Presenter que transforma resposta Twygo em linhas de tabela.
