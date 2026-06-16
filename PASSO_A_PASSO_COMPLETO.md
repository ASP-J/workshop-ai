# Passo a passo completo do projeto

Este documento e o caminho principal da aula.

Siga na ordem.

Se voce travar em algum ponto, abra:

```text
PASSO_A_PASSO_SE_TRAVAR.md
```

## O que voce vai fazer

Voce vai usar Claude ou Codex para construir e entender um painel local.

Esse painel vai:

1. Buscar usuarios na API da Twygo.
2. Receber um CSV de capacitacao.
3. Cruzar usuarios + CSV pelo email.
4. Mostrar uma tabela.
5. Mostrar cards de resumo.
6. Mostrar graficos.
7. Proteger o token da API usando `.env`.

## Como a aula funciona

Voce nao precisa decorar codigo.

Voce vai trabalhar assim:

```text
copiar prompt -> colar no Claude/Codex -> esperar a IA agir -> conferir -> pedir explicacao
```

Regra obrigatoria:

```text
Sempre peça para a IA explicar o que esta fazendo.
```

Use esta frase sempre que precisar:

```text
Explique em linguagem simples, como se eu nunca tivesse programado.
```

## Etapa 1 - Pegar a versao correta do projeto

O projeto tem uma branch propria para alunos:

```text
alunos
```

Cole este prompt no Claude ou Codex:

```text
Clone a branch alunos deste repositorio:
https://github.com/ASP-J/workshop-ai.git

Depois leia o README.md.
Me explique em linguagem simples:
1. o que e este projeto
2. quais arquivos eu preciso conhecer
3. qual e o primeiro passo
4. o que eu devo conferir no navegador

Antes de alterar qualquer coisa, explique o plano.
Depois de alterar, diga quais arquivos mudaram e como eu confiro se funcionou.
```

Se o instrutor pedir SSH, use este:

```text
Clone a branch alunos deste repositorio:
git@github.com:ASP-J/workshop-ai.git

Depois leia o README.md.
Me explique em linguagem simples:
1. o que e este projeto
2. quais arquivos eu preciso conhecer
3. qual e o primeiro passo
4. o que eu devo conferir no navegador

Antes de alterar qualquer coisa, explique o plano.
Depois de alterar, diga quais arquivos mudaram e como eu confiro se funcionou.
```

Voce pode continuar quando a IA confirmar que esta na branch:

```text
alunos
```

## Etapa 2 - Entender o desafio antes de mexer

Cole este prompt:

```text
Leia o README.md, o DESAFIO.md e a APOSTILA_CONCEITOS.md.

Nao altere arquivos ainda.

Me explique em linguagem simples:
1. qual e o objetivo do projeto
2. o que e a API da Twygo
3. o que e o CSV
4. por que o cruzamento usa email
5. o que a tela final precisa mostrar
6. quais arquivos parecem mais importantes

No final, me diga o primeiro passo pratico.
```

Voce entendeu esta etapa se conseguir explicar:

```text
O painel busca usuarios na Twygo, recebe uma planilha CSV, cruza os dados pelo email e mostra o resultado em tabela, cards e graficos.
```

## Etapa 3 - Preparar o projeto local

Cole este prompt:

```text
Prepare este projeto para rodar localmente.

Instale as dependencias necessarias.
Antes de fazer qualquer alteracao, explique o plano.
Depois de preparar, me diga:
1. o que foi instalado
2. o que foi configurado
3. quais arquivos mudaram
4. qual URL devo abrir no navegador
5. como eu confiro se funcionou

Explique tudo em linguagem simples.
```

Resultado esperado:

A IA deve preparar o projeto e indicar uma URL parecida com:

```text
http://localhost:5183
```

Nao precisa decorar essa URL.

Guarde apenas a ideia:

```text
localhost = meu proprio computador
```

## Etapa 4 - Configurar o token da Twygo

O instrutor vai entregar um token.

Esse token e a chave para acessar os usuarios da Twygo.

Voce nao precisa abrir o arquivo `.env` manualmente.

Cole este prompt no Claude ou Codex e substitua a linha indicada pelo token recebido:

```text
Configure o arquivo .env com este token da Twygo:
[cole aqui o token recebido do instrutor]

Salve esse valor na variavel TWYGO_API_TOKEN.
Nao mostre, nao repita e nao imprima meu token na resposta.
Nao coloque o token no frontend.
Nao coloque o token no README.
Nao publique o token no GitHub.

No final, apenas confirme:
1. que o .env foi configurado
2. que o token ficou em TWYGO_API_TOKEN
3. que o token nao foi exposto

Explique em linguagem simples por que o token precisa ficar protegido.
```

Voce pode continuar quando a IA confirmar:

```text
o .env foi configurado
```

## Etapa 5 - Abrir o projeto no navegador

Cole este prompt:

```text
Abra o projeto local.

Confira:
1. se o frontend abriu no navegador
2. se o backend esta respondendo
3. se a API da Twygo respondeu
4. qual URL eu devo usar

Se der erro, explique em linguagem simples e corrija.
Depois me diga exatamente o que devo ver na tela.
```

O esperado e abrir algo parecido com:

```text
http://localhost:5183
```

Na tela, procure sinais de:

- usuarios
- painel
- upload de CSV
- cards
- tabela
- graficos ou espacos para graficos

## Etapa 6 - Entender o que significa API da Twygo

Cole este prompt:

```text
Me explique o que significa conectar na API da Twygo neste projeto.

Explique em linguagem simples:
1. de onde vem os usuarios
2. para que serve o token
3. por que o backend protege o token
4. como o frontend recebe os usuarios
5. como eu confiro se a API respondeu

Nao altere arquivos.
So explique.
```

Resumo que voce precisa guardar:

```text
A API da Twygo entrega os usuarios.
O token autoriza a busca.
O backend usa o token.
A tela mostra os usuarios.
```

## Etapa 7 - Conferir se os usuarios carregaram

Cole este prompt:

```text
Confira se os usuarios da Twygo carregaram corretamente.

Verifique:
1. se a rota local /api/users respondeu
2. se o backend chamou a API da Twygo
3. se os usuarios chegaram no frontend
4. se a tela mostra uma lista ou tabela de usuarios

Nao mostre meu token na resposta.
Explique em linguagem simples como voce verificou.
```

Voce pode continuar quando conseguir ver usuarios ou quando a IA confirmar que os dados chegaram.

Se nao carregar, abra:

```text
PASSO_A_PASSO_SE_TRAVAR.md
```

e use a etapa da API.

## Etapa 8 - Anexar o CSV

O CSV e a planilha de capacitacao.

Use o arquivo:

```text
public/sample-capacitacao.csv
```

Cole este prompt:

```text
Me explique como anexar o CSV no painel.

O arquivo esta em:
public/sample-capacitacao.csv

Explique:
1. onde fica a area de upload
2. como eu escolho o arquivo
3. o que deve acontecer depois de anexar
4. quais colunas o CSV precisa ter
5. como eu confiro se o CSV foi lido
```

O CSV deve ter colunas como:

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
```

Voce pode continuar quando o painel reconhecer o CSV.

## Etapa 9 - Entender o cruzamento por email

O cruzamento junta duas fontes:

```text
usuarios da Twygo + linhas do CSV
```

A ligacao entre elas e:

```text
email
```

Cole este prompt:

```text
Explique como o projeto cruza usuarios da Twygo com o CSV.

Use linguagem simples.
Explique:
1. de onde vem o email da Twygo
2. de onde vem o email do CSV
3. o que acontece quando os emails sao iguais
4. o que acontece quando nao existe email correspondente
5. onde eu confiro o resultado na tela

Depois confira se o cruzamento esta funcionando.
```

Exemplo:

```text
Twygo: ana@empresa.com
CSV: ana@empresa.com
Resultado: Ana aparece com dados de capacitacao.
```

Voce pode continuar quando a tabela mostrar usuarios com dados de capacitacao.

## Etapa 10 - Conferir a tabela

A tabela deve ajudar a responder:

- quem e o usuario
- qual e o email
- qual area aparece
- quais cursos ou capacitacoes aparecem
- quantas horas aparecem
- qual status aparece

Cole este prompt:

```text
Confira se a tabela do painel esta clara.

Ela precisa mostrar usuarios e dados de capacitacao cruzados pelo email.

Explique:
1. quais colunas aparecem
2. quais dados vieram da Twygo
3. quais dados vieram do CSV
4. como eu sei que o cruzamento funcionou

Se a tabela estiver confusa, melhore a apresentacao sem mudar a regra do email.
```

Voce pode continuar quando a tabela fizer sentido visualmente.

## Etapa 11 - Conferir os cards

Cards sao blocos pequenos de resumo.

Eles servem para bater o olho e entender os numeros principais.

Cole este prompt:

```text
Confira se o painel tem cards de resumo.

Os cards devem mostrar indicadores como:
1. total de usuarios
2. usuarios encontrados no CSV
3. total de horas de capacitacao
4. media de horas
5. cursos concluidos
6. areas com capacitacao

Explique o que cada card significa.
Se faltar algum indicador importante, implemente de forma simples.
Depois diga como eu confiro na tela.
```

Voce pode continuar quando existirem cards preenchidos com numeros.

## Etapa 12 - Conferir os graficos

Graficos ajudam a visualizar os dados.

O painel deve ter pelo menos:

- grafico de pizza ou donut
- grafico de barras

Cole este prompt:

```text
Confira se o painel tem graficos.

Os graficos devem ajudar a entender:
1. horas ou usuarios por area
2. capacitacoes por categoria
3. status das capacitacoes

Explique o que cada grafico mostra.
Se algum grafico estiver vazio ou confuso, corrija.
Depois diga como eu confiro visualmente.
```

Voce pode continuar quando os graficos aparecerem e fizerem sentido.

## Etapa 13 - Conferir a area do usuario

Neste desafio, a area deve vir do perfil do usuario quando existir.

Cole este prompt:

```text
Confira como o projeto define a area de cada usuario.

Explique em linguagem simples:
1. se a area vem do perfil da Twygo
2. qual campo e usado primeiro
3. o que acontece se o usuario nao tiver area
4. como a area aparece na tabela e nos graficos

Se a regra estiver diferente, ajuste para usar a area do perfil quando existir.
```

Regra esperada:

```text
se tiver area no perfil -> usa area do perfil
se nao tiver -> tenta usar outro campo parecido
se nao tiver nada -> mostra Sem area no perfil
```

## Etapa 14 - Pedir para a IA explicar os arquivos

Cole este prompt:

```text
Liste os arquivos principais do projeto.

Para cada arquivo, explique:
1. para que ele serve
2. se ele pertence ao frontend ou backend
3. qual parte do desafio depende dele
4. se eu preciso mexer nele ou apenas entender

Use linguagem simples.
```

Arquivos que provavelmente vao aparecer:

- `README.md`
- `DESAFIO.md`
- `APOSTILA_CONCEITOS.md`
- `PASSO_A_PASSO_COMPLETO.md`
- `PASSO_A_PASSO_SE_TRAVAR.md`
- `.env.example`
- `server/index.js`
- `server/twygoApi.js`
- `src/App.jsx`
- `src/trainingCsv.js`
- `src/trainingDashboard.js`
- `public/sample-capacitacao.csv`

## Etapa 15 - Validar tudo

Cole este prompt:

```text
Valide a entrega final do desafio.

Confira:
1. se a tela abre
2. se a API da Twygo responde
3. se os usuarios aparecem
4. se o CSV anexa
5. se o cruzamento usa email
6. se a tabela aparece
7. se os cards aparecem
8. se os graficos aparecem
9. se a area vem do perfil do usuario quando existir
10. se o token esta protegido no .env
11. se o token nao aparece na tela
12. se o token nao aparece no README

Se algo estiver errado, explique e corrija.
Depois me diga, em linguagem simples, se o projeto esta pronto para apresentar.
```

Voce pode continuar quando a IA confirmar os itens e a tela estiver funcionando.

## Etapa 16 - Preparar a apresentacao final

Cole este prompt:

```text
Me ajude a preparar uma apresentacao curta do projeto.

Crie uma fala simples explicando:
1. qual problema o painel resolve
2. o que vem da API da Twygo
3. o que vem do CSV
4. como o email cruza os dados
5. o que os cards mostram
6. o que os graficos mostram
7. por que o token fica protegido

Use linguagem natural, como se eu fosse apresentar para a turma.
```

Frase base:

```text
Eu criei um painel local que busca usuarios na API da Twygo, recebe um CSV de capacitacao, cruza os dados pelo email e mostra indicadores em tabela, cards e graficos.
```

## Etapa 17 - Se perguntarem o que voce aprendeu

Voce pode responder:

```text
Aprendi a usar Claude ou Codex para construir um sistema local, conectar em uma API, proteger um token, anexar um CSV e cruzar dados pelo email.
```

Ou:

```text
Aprendi que a IA pode ajudar a construir, mas eu preciso saber pedir, conferir e entender o fluxo dos dados.
```

## Checklist final do aluno

Antes de dizer que terminou, confira:

- estou na branch `alunos`
- li o README
- entendi o desafio
- pedi para a IA preparar o projeto
- configurei o token com ajuda da IA
- a tela abriu
- a API da Twygo respondeu
- os usuarios apareceram
- anexei o CSV
- a tabela cruzou por email
- os cards apareceram
- os graficos apareceram
- a area aparece nos dados
- o token nao aparece na tela
- consigo explicar o projeto em voz alta

## Quando usar o documento de emergencia

Use:

```text
PASSO_A_PASSO_SE_TRAVAR.md
```

quando:

- a tela nao abrir
- a API nao responder
- o token der erro
- o CSV nao anexar
- a tabela nao cruzar
- os graficos nao aparecerem
- voce se perder no meio da aula

## Resumo de uma linha

```text
Twygo entrega usuarios, CSV entrega capacitacoes, email junta os dois, painel mostra tabela, cards e graficos.
```
