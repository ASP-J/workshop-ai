# Gabarito super guiado - Workshop AI + API Twygo + CSV

Este gabarito foi escrito para pessoas que **nunca leram codigo**.

A ideia nao e a pessoa entender cada linha. A ideia e ela aprender o fluxo:

```text
Pedir para a IA criar um app -> conectar na API da Twygo -> anexar CSV -> cruzar dados -> ver graficos
```

## O que cada coisa significa

**App local**

Um sisteminha que roda no computador da pessoa, abrindo no navegador.

**API**

Um endereco que entrega dados. Neste workshop, a API entrega usuarios da Twygo.

**Token**

Uma chave de acesso. Sem ela, a API nao deixa buscar os dados.

**CSV**

Uma planilha simples salva em formato `.csv`. Neste workshop, ela tem dados de capacitacao.

**Cruzamento**

Juntar duas fontes de dados usando uma informacao em comum. Aqui, a informacao em comum e o `email`.

## Antes de comecar

O instrutor precisa entregar para os alunos:

1. Link do repositorio.
2. Token da API.
3. CSV de capacitacao.

O CSV ja vem pronto. Os alunos **nao precisam criar o CSV**.

Formato esperado do CSV:

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
```

Exemplo:

```text
karin.rosario@twygo.com,Backoffice,Processos,Gestao de processos internos,6,Concluido,8.5,2026-05-04
```

## Regra importante sobre area

A coluna `area` deve vir do perfil do usuario na Twygo.

Regra simples:

1. Se o usuario tem area/departamento no perfil, usar essa area.
2. Se nao tiver, tentar usar cargo ou segmento.
3. Se nao tiver nada no perfil, usar `Sem area no perfil`.

Exemplos de areas do organograma:

- Diretoria Executiva
- Backoffice
- Financeiro
- Recursos Humanos
- Gestao de conteudo
- Conteudo
- Marketing
- Geracao de Leads
- Design de Marketing
- Sucesso do Cliente
- Atendimento
- Engajamento
- Produto e Qualidade
- Engenharia de Produto
- Qualidade e Testes
- Sustentacao
- Vendas
- Qualificacao
- Solucoes
- Engenharia
- Arquitetura Tecnologica
- Desenvolvimento
- Business Intelligence
- Dados e Hubspot

## Como usar este gabarito

Cada etapa abaixo tem:

- **Objetivo:** o que queremos construir.
- **Prompt para copiar:** cole exatamente na IA.
- **Depois confira:** como saber se funcionou.
- **Se der erro:** o que pedir para a IA.

Nao pule etapas.

So avance quando a etapa anterior estiver funcionando.

---

# Etapa 1 - Criar o app local

## Objetivo

Criar a base do sistema no computador.

## Prompt para copiar

```text
Cria um sistema local chamado workshop-ai usando React com Vite.
Quero uma tela inicial simples chamada "Painel de capacitacao".
Ainda nao precisa conectar em API.
Crie os arquivos basicos e me diga quais comandos eu preciso rodar para abrir no navegador.
Explique como se eu nunca tivesse programado.
```

## Depois confira

A IA deve criar uma estrutura parecida com:

```text
package.json
index.html
src/App.jsx
src/styles.css
```

Ela tambem deve mandar rodar:

```bash
npm install
npm run dev
```

Quando abrir no navegador, precisa aparecer alguma tela com o titulo do painel.

## Se der erro

Copie o erro e mande:

```text
Deu esse erro ao rodar o app. Me explica o que significa e corrige o projeto:
[cole o erro aqui]
```

---

# Etapa 2 - Criar o servidor local

## Objetivo

Criar um "meio de campo" entre a tela e a API da Twygo.

Por que isso existe?

Porque o token nao deve ficar dentro do React.

## Prompt para copiar

```text
Agora adiciona um backend local com Node e Express.
Ele deve rodar na porta 5184.
Crie uma rota GET /health que responda { "ok": true }.
Crie uma rota GET /api/users que por enquanto pode responder uma lista fake de usuarios.
Tambem configure o Vite para o React conseguir chamar /api/users.
Nao mexa ainda na API real da Twygo.
```

## Depois confira

No terminal, rode:

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:5184/health
```

Tem que aparecer:

```json
{"ok":true}
```

## Se der erro

Mande para a IA:

```text
O backend local nao abriu ou a rota /health nao respondeu.
Aqui esta o erro:
[cole o erro aqui]
Corrige e me diga exatamente qual comando rodar.
```

---

# Etapa 3 - Proteger o token no .env

## Objetivo

Guardar a chave da API em um arquivo local seguro.

## Prompt para copiar

```text
Adiciona suporte a arquivo .env.
Crie um arquivo .env.example com a variavel TWYGO_API_TOKEN=cole_o_token_aqui.
Garanta que .env esteja no .gitignore para nao subir token para o GitHub.
O backend deve ler process.env.TWYGO_API_TOKEN.
```

## Depois confira

Tem que existir:

```text
.env.example
.gitignore
```

No `.gitignore`, precisa ter:

```text
.env
```

Agora crie seu `.env`:

```bash
cp .env.example .env
```

Abra o `.env` e coloque o token real:

```text
TWYGO_API_TOKEN=seu_token_aqui
```

## Se der erro

Mande para a IA:

```text
Nao sei se meu .env esta certo.
Confere a configuracao e garante que o token nao vai para o GitHub.
```

---

# Etapa 4 - Conectar na API real da Twygo

## Objetivo

Buscar usuarios reais da Twygo.

## Prompt para copiar

```text
Agora altere a rota GET /api/users do backend.
Ela deve chamar a API real:
https://api.twygo.com/api/v2/users?page=1&per_page=50

Use o header:
Authorization: Bearer <TWYGO_API_TOKEN>

O token deve vir do .env.
Se a API der erro, retorne uma mensagem clara para a tela.
```

## Depois confira

Com o app rodando, abra:

```text
http://localhost:5184/api/users
```

Tem que aparecer um JSON com:

```text
message: success
data
users
pagination
```

Nao precisa entender o JSON inteiro. So confirme que nao apareceu erro.

## Se der erro 401

401 quase sempre significa token errado.

Mande para a IA:

```text
A API retornou 401.
Me ajuda a conferir se estou usando Authorization: Bearer e lendo o TWYGO_API_TOKEN do .env.
```

## Se der erro de CORS

Mande:

```text
Deu erro de CORS.
Lembra que o React deve chamar /api/users no backend local, e o backend local deve chamar a API da Twygo.
Corrige isso.
```

---

# Etapa 5 - Mostrar usuarios na tela

## Objetivo

Fazer o React mostrar os usuarios que vieram da API.

## Prompt para copiar

```text
No React, busque /api/users quando a tela abrir.
Mostre uma tabela simples com:
- nome
- email
- status

Inclua mensagens de:
- carregando
- erro
- nenhum usuario encontrado

Nao crie busca por nome, email ou ID.
```

## Depois confira

A tela deve mostrar usuarios automaticamente.

Nao deve ter campo de busca.

Se abrir o DevTools, o React deve chamar:

```text
/api/users
```

Nao deve chamar direto:

```text
https://api.twygo.com
```

## Se der erro

Mande:

```text
A tela nao esta mostrando usuarios.
Confere se o React esta chamando /api/users e se esta lendo o formato data.users da resposta.
```

---

# Etapa 6 - Criar upload do CSV

## Objetivo

Permitir anexar a planilha de capacitacao fornecida pelo instrutor.

## Prompt para copiar

```text
Adiciona uma area na tela para anexar um arquivo CSV.
O CSV tera essas colunas:
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em

Leia o arquivo no navegador.
Depois de anexar, mostre quantas linhas foram lidas.
Ignore linhas sem email.
Nao envie esse CSV para nenhum servidor.
```

## Depois confira

Na tela, deve aparecer um botao parecido com:

```text
Anexar CSV
```

Ao anexar o arquivo, deve aparecer algo como:

```text
149 linhas positivas
```

## Se der erro

Mande:

```text
O CSV nao carregou.
Confere se o input aceita .csv e se o parser esta lendo as colunas pelo cabecalho.
```

---

# Etapa 7 - Cruzar API + CSV

## Objetivo

Juntar os usuarios da Twygo com a planilha.

A regra e:

```text
usuario.email == csv.email
```

## Prompt para copiar

```text
Agora cruze os usuarios da API com as linhas do CSV usando o email.
Para cada usuario, calcule:
- area
- categorias
- cursos
- total de horas de capacitacao
- nota media
- status do cruzamento: Com dados ou Sem dados no CSV

Se uma pessoa tiver varias linhas no CSV, some as horas.
Nao duplique categorias e cursos repetidos.
Mostre tudo em uma tabela final.
```

## Depois confira

Na tabela final, uma pessoa com varios cursos deve ter:

```text
horas somadas
nota media
mais de um curso listado
Com dados
```

Quem nao aparecer no CSV deve ficar:

```text
Sem dados no CSV
```

## Se der erro

Mande:

```text
O cruzamento nao funcionou.
Confere se esta comparando email com email, usando minusculas e removendo espacos.
```

---

# Etapa 8 - Criar cards de resumo

## Objetivo

Mostrar numeros grandes no topo da tela.

## Prompt para copiar

```text
Crie cards de resumo calculados a partir do cruzamento:
- Usuarios na tela
- Com capacitacao
- Horas totais
- Cobertura em porcentagem

Cobertura significa:
usuarios com capacitacao / usuarios carregados da API * 100
```

## Depois confira

Depois de anexar o CSV, os cards devem mudar.

Exemplo:

```text
Usuarios na tela: 50
Com capacitacao: 50
Horas totais: 1490h
Cobertura: 100%
```

Os numeros exatos podem mudar, mas precisam fazer sentido.

---

# Etapa 9 - Criar graficos

## Objetivo

Transformar a tabela em visual.

## Prompt para copiar

```text
Crie graficos no painel:
- Donut de horas por area
- Donut de usuarios por categoria
- Donut de situacao do cruzamento
- Barras de top cursos por horas

Use os dados calculados no cruzamento.
Cada donut deve ter legenda com nome, valor e percentual.
Pode usar CSS com conic-gradient, sem instalar biblioteca pesada.
```

## Depois confira

A tela deve mostrar:

```text
Horas por area
Usuarios por categoria
Situacao do cruzamento
Top cursos por horas
```

Os donuts devem ter fatias coloridas.

O grafico de top cursos deve ser barra, porque e ranking.

---

# Etapa 10 - Melhorar o visual

## Objetivo

Deixar a demo apresentavel para a empresa.

## Prompt para copiar

```text
Melhora o visual para parecer uma ferramenta de trabalho, nao uma landing page.

A tela deve ter:
- topo compacto
- area de upload do CSV
- cards de resumo
- graficos em grid
- tabela final grande
- painel lateral explicando: API + CSV = painel

Garanta que nao tenha texto sobreposto e que funcione em telas menores.
```

## Depois confira

A tela deve ser facil de explicar:

1. Primeiro carrega usuarios.
2. Depois anexa CSV.
3. Depois aparecem numeros e graficos.

---

# Etapa 11 - Criar testes

## Objetivo

Garantir que o sistema nao quebre quando mexer.

## Prompt para copiar

```text
Adiciona testes automatizados com Vitest para:
- montar a query da API local
- chamar o backend local com Bearer token
- transformar usuarios da API para tabela
- ler CSV
- cruzar usuarios + CSV
- gerar fatias dos graficos de donut

Me diga qual comando roda os testes.
```

## Depois confira

Rode:

```bash
npm test
```

Tem que aparecer algo como:

```text
Test Files passed
Tests passed
```

Se aparecer vermelho, copie o erro e peça para a IA corrigir.

---

# Etapa 12 - Validar tudo

## Objetivo

Conferir que a entrega esta pronta.

## Comandos finais

```bash
npm test
npx vite build
npm run dev
```

## Checklist final

Marque mentalmente:

- A tela abre no navegador.
- Usuarios da Twygo carregam.
- O CSV anexa.
- A tabela cruza por email.
- Os cards aparecem.
- Os donuts aparecem.
- O grafico de barras aparece.
- O token nao esta dentro do React.
- O `.env` nao foi para o GitHub.

---

# Explicacao final para o aluno falar em voz alta

Se alguem perguntar "o que voce fez?", responder:

```text
Eu criei um painel local que busca usuarios na API da Twygo, recebe um CSV de capacitacao, cruza os dados pelo email e mostra indicadores em cards, tabela e graficos.
```

Se perguntarem "por que tem backend?", responder:

```text
Porque o token da API nao pode ficar exposto no React. O backend local guarda o token e faz a chamada segura.
```

Se perguntarem "por que cruzou por email?", responder:

```text
Porque email existe tanto na API quanto no CSV, entao ele funciona como chave comum entre as duas fontes.
```

# Erros comuns e como explicar

## Erro: tela branca

Provavel causa:

- React quebrou.
- Faltou renderizar o App.
- Algum import esta errado.

Prompt para corrigir:

```text
Minha tela ficou branca. Analisa os erros do console e corrige o React.
```

## Erro: 401

Provavel causa:

- token errado;
- esqueceu `Bearer`;
- `.env` nao foi lido.

Prompt:

```text
A API retornou 401. Confere o token, o Bearer e a leitura do .env.
```

## Erro: CSV nao cruza

Provavel causa:

- email com espaco;
- email maiusculo/minusculo;
- cabecalho errado;
- coluna se chama diferente.

Prompt:

```text
O CSV carregou, mas nao cruzou com os usuarios. Normalize os emails com trim e lowercase e confira o cabecalho.
```

## Erro: grafico estranho

Provavel causa:

- dados vazios;
- valores de horas como texto;
- algum numero veio com virgula.

Prompt:

```text
Os graficos ficaram errados. Confere se horas_capacitacao esta virando numero e se valores vazios viram zero.
```

# O que nao fazer no workshop

- Nao usar `POST`, `PUT` ou `DELETE`.
- Nao criar usuario real.
- Nao alterar dados da plataforma.
- Nao colocar token dentro do React.
- Nao subir `.env` para o GitHub.
- Nao tentar explicar cada linha de codigo para iniciantes. Explique o fluxo primeiro.
