# Twygo Users Lab - Design

## Proposito

Demo de workshop para mostrar como sair de uma collection Postman e chegar em uma tela React que consome a API de usuarios da Twygo, cruza com uma planilha CSV e gera indicadores.

## Decisoes

- Usar API real apenas com `GET /api/v2/users`.
- Manter o Bearer token no backend local via `.env`.
- Evitar operacoes destrutivas ou que mudem dados.
- Remover busca manual: o foco e listar usuarios, anexar CSV e cruzar fontes.
- Criar `public/sample-capacitacao.csv` com dados positivos e categorias uteis para graficos.
- Usar visual de painel de trabalho: upload no topo, cards, graficos, tabela no centro e explicacao lateral curta.

## Fluxo

```text
Usuario abre a tela
  -> React chama /api/users
  -> Express adiciona Authorization: Bearer
  -> API Twygo retorna JSON
  -> Usuario anexa CSV ou usa amostra
  -> React cruza por email
  -> React mostra cards, graficos e tabela enriquecida
```

## Testes

- Query builder do backend.
- Cliente local do backend.
- Cliente do frontend.
- Presenter que transforma resposta Twygo em linhas de tabela.
- Parser de CSV de capacitacao.
- Cruzamento API + CSV e agregacoes para graficos.
