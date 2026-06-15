# Gabarito - Workshop AI + API Twygo + CSV

## Objetivo do desafio

Criar um sistema local que:

1. Consulta usuarios da Twygo pela API v2.
2. Recebe um CSV de capacitacao fornecido pelo instrutor.
3. Cruza API + CSV pelo email.
4. Mostra cards, tabela e graficos de capacitacao.

O CSV **nao precisa ser gerado pelos alunos**. Ele sera fornecido no workshop.

## Preparacao do instrutor

Entregue aos alunos:

- Repositorio do projeto.
- Bearer token da API ou instrucao de onde copiar.
- CSV de capacitacao.

CSV esperado:

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
```

Regra da coluna `area`:

- usar a area/departamento do perfil do usuario na Twygo;
- se `department` estiver vazio, usar outro campo de perfil que indique area, como segmento/cargo;
- se o perfil nao tiver area preenchida, usar `Sem area no perfil`;
- normalizar nomes para as areas do organograma, por exemplo `Sucesso do Cliente`, `Produto e Qualidade`, `Engenharia de Produto`, `Qualidade e Testes`, `Solucoes`, `Business Intelligence`.

Exemplo de linha:

```text
karin.rosario@twygo.com,Produto,Lideranca,Lideranca colaborativa,12,Concluido,9.7,2026-05-06
```

## Roteiro prompt por prompt

### Prompt 1 - Criar a base do sistema

```text
Cria um sistema em React com Vite chamado workshop-ai.
Ele deve rodar localmente e abrir uma tela inicial de painel de capacitacao.
Use uma estrutura simples, com src/App.jsx, src/styles.css e package.json.
```

O que verificar:

- `npm install` funciona.
- `npm run dev` abre uma tela local.
- A tela ainda pode estar vazia, mas precisa renderizar sem erro.

### Prompt 2 - Criar backend local para proteger o token

```text
Adiciona um backend local com Node e Express.
Cria uma rota GET /api/users.
Essa rota deve chamar https://api.twygo.com/api/v2/users?page=1&per_page=50.
O Bearer token deve ficar em .env como TWYGO_API_TOKEN.
Nao coloque o token no React.
Cria tambem .env.example.
```

O que verificar:

- `.env.example` existe.
- `.env` fica fora do Git.
- `GET http://localhost:5184/health` responde.
- `GET http://localhost:5184/api/users` retorna `message: success`.

### Prompt 3 - Listar usuarios da plataforma

```text
No React, chama /api/users quando a tela abrir.
Mostra os usuarios retornados em uma tabela com nome, email e status.
Inclui estados de carregando e erro.
Nao cria busca por nome, email ou ID.
```

O que verificar:

- A tela carrega usuarios automaticamente.
- Nao existe campo de busca.
- O frontend chama apenas `/api/users`, nao a API externa direto.

### Prompt 4 - Adicionar upload do CSV

```text
Adiciona uma area para anexar um arquivo CSV de capacitacao.
O CSV tera as colunas email, area, categoria, curso, horas_capacitacao, status_capacitacao, nota e concluido_em.
Leia o CSV no frontend e normalize os dados.
Use o email em minusculo como chave de cruzamento.
```

O que verificar:

- O botao de anexar CSV aparece.
- Ao anexar o CSV, a tela mostra quantas linhas foram lidas.
- Linhas sem email devem ser ignoradas.

### Prompt 5 - Cruzar usuarios da API com o CSV

```text
Cruze os usuarios da API com os registros do CSV pelo email.
Para cada usuario, calcule:
- area
- categorias
- cursos
- total de horas de capacitacao
- nota media
- status do cruzamento: Com dados ou Sem dados no CSV
Mostre esses dados em uma tabela final.
```

O que verificar:

- Usuarios com email no CSV aparecem como `Com dados`.
- Usuarios sem email no CSV aparecem como `Sem dados no CSV`.
- Horas de varias linhas do mesmo email sao somadas.
- Cursos e categorias repetidos nao precisam aparecer duplicados.

### Prompt 6 - Criar cards de resumo

```text
Cria cards no topo do painel com:
- usuarios na tela
- usuarios com capacitacao
- horas totais
- percentual de cobertura
Os numeros devem ser calculados a partir do cruzamento API + CSV.
```

O que verificar:

- Os cards mudam quando um CSV e anexado.
- A cobertura e calculada como usuarios com capacitacao dividido por usuarios carregados.

### Prompt 7 - Criar graficos

```text
Cria graficos para o painel:
- grafico de pizza ou donut para horas por area
- grafico de pizza ou donut para usuarios por categoria
- grafico de pizza ou donut para situacao do cruzamento
- grafico de barras para top cursos por horas
Nao use biblioteca pesada se nao precisar; pode usar CSS com conic-gradient para os donuts.
```

O que verificar:

- Graficos aparecem depois do CSV.
- As pizzas/donuts mostram legenda com valor e percentual.
- Top cursos fica em barras, porque e um ranking.

### Prompt 8 - Melhorar o visual do painel

```text
Melhora o layout para parecer uma ferramenta de trabalho:
- topo compacto
- area de upload do CSV
- cards de resumo
- graficos em grid
- tabela final grande
- painel lateral explicando o fluxo API + CSV
Garanta que funcione em tela menor tambem.
```

O que verificar:

- Nao parece landing page.
- A primeira tela ja mostra a ferramenta.
- Textos nao se sobrepoem.
- Tabela tem rolagem horizontal quando necessario.

### Prompt 9 - Adicionar testes

```text
Adiciona testes automatizados para:
- montar query da API local
- chamar o backend local com Bearer token
- transformar usuarios da API para tabela
- ler CSV
- cruzar usuarios + CSV
- gerar os dados dos graficos de pizza
```

O que verificar:

```bash
npm test
```

Todos os testes precisam passar.

### Prompt 10 - Validar entrega

```text
Rode os testes, rode o build e abra o sistema no navegador.
Clique para anexar ou usar o CSV fornecido.
Confirme que a API carrega, que o CSV cruza com os usuarios e que os graficos aparecem.
```

Comandos esperados:

```bash
npm test
npx vite build
npm run dev
```

## Arquitetura esperada

```text
React
  -> /api/users no servidor local
  -> upload do CSV no navegador
  -> cruzamento por email
  -> cards + tabela + graficos

Express
  -> adiciona Authorization: Bearer
  -> chama https://api.twygo.com/api/v2/users
```

## Erros comuns

- Usar a API 1.0 em vez da API 2.0.
- Chamar `https://api.twygo.com` diretamente no React.
- Colocar o token dentro do `src/`.
- Esquecer `Bearer` antes do token.
- Tentar cruzar por nome em vez de email.
- Usar CSV sem cabecalho.
- Nao somar varias linhas de capacitacao da mesma pessoa.
- Criar busca manual e perder o foco do desafio.
- Testar `POST` ou `PUT` em producao.

## Resultado final esperado

A tela final deve mostrar:

- Usuarios carregados da plataforma.
- Upload de CSV de capacitacao.
- Cards com usuarios, cobertura e horas.
- Donuts por area, categoria e status do cruzamento.
- Barras com top cursos por horas.
- Tabela cruzada por usuario.

O aluno deve conseguir explicar o fluxo em uma frase:

```text
Eu busquei usuarios na API da Twygo, anexei um CSV de capacitacao, cruzei pelo email e gerei indicadores na tela.
```
