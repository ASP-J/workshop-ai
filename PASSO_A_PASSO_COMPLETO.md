# Passo a passo completo do projeto

Este documento é o caminho principal da aula.

Siga na ordem.

Se você travar em algum ponto, abra:

```text
PASSO_A_PASSO_SE_TRAVAR.md
```

## O que você vai fazer

O painel local já vem pronto na branch `alunos`.

Você vai usar Claude ou Codex para **rodar, entender, conferir e evoluir** esse painel.

Esse painel:

1. Busca todos os usuários na API da Twygo (todas as páginas).
2. Recebe um CSV de capacitação.
3. Cruza usuários + CSV pelo e-mail.
4. Mostra uma tabela.
5. Mostra cards de resumo.
6. Mostra gráficos.
7. Protege o token da API usando `.env`.

## Como a aula funciona

Você não precisa decorar código.

Você vai trabalhar assim:

```text
copiar prompt -> colar no Claude/Codex -> esperar a IA agir -> conferir -> pedir explicação
```

Regra obrigatória:

```text
Sempre peça para a IA explicar o que está fazendo.
```

Use esta frase sempre que precisar:

```text
Explique em linguagem simples, como se eu nunca tivesse programado.
```

## Etapa 0 - Antes do projeto: a rodada "pergunte ao Claude"

Antes de abrir o projeto, cada pessoa faz uma rodada rápida com o Claude para descobrir como ele pode ajudar no próprio trabalho.

1. Abra o Claude (claude.ai ou o Claude Code, tanto faz nesta etapa).
2. Cole o pedido abaixo e complete com o seu setor e as suas tarefas.
3. Escolha os 2 usos que mais economizariam tempo para você.
4. Apresente para a turma em 1 minuto: a tarefa de hoje, como o Claude ajuda e qual é o ganho.

```text
Eu trabalho em [setor] e no dia a dia eu [3 tarefas].
Me dê 5 ideias de como você pode facilitar o meu trabalho.
Para cada uma: o que eu te pediria, um exemplo de pedido pronto e quanto tempo eu economizaria.
Use linguagem simples.
```

Regra da rodada: **sem dado real no pedido.** Não coloque nome, e-mail ou informação real de colaborador ou cliente. Use exemplos inventados.

Os usos que aparecerem na rodada viram ideias para evoluir o painel do seu setor no final.

Mais detalhes na seção 3 da `APOSTILA_CONCEITOS.md`.

## Antes da Etapa 1 - Preparar o computador

Faça isto **uma vez só** (de preferência antes da aula). Você precisa de **Node.js 22.12 ou mais novo**, **Git** e **Claude Code** (ou Codex).

**No Mac**

1. Instale o Node.js **LTS** de <https://nodejs.org/pt>.
2. No Terminal, digite `git --version` (se o Mac oferecer instalar as "ferramentas de linha de comando", aceite).
3. Crie a pasta do workshop e abra o Claude nela:

   ```bash
   mkdir workshop && cd workshop && claude
   ```

**No Windows (10 ou 11)**

1. Instale o Node.js **LTS** (arquivo `.msi`) de <https://nodejs.org/pt> com as opções padrão.
2. Instale o **Git para Windows** de <https://git-scm.com/downloads/win> com as opções padrão.
3. **Feche e abra de novo** o terminal (senão ele não enxerga o Node e o Git).
4. Abra o **Prompt de Comando** (tecla Windows, digite `cmd`, Enter) e digite, uma linha de cada vez:

   ```bat
   mkdir C:\workshop
   cd C:\workshop
   claude
   ```

Use `C:\workshop` (ou outra pasta curta) e **não** uma pasta dentro do **OneDrive**: lá a instalação fica lenta e pode dar erro.

> Está no **PowerShell**? Digite um comando por linha (o `&&` não funciona no PowerShell antigo). Se o `npm` der erro de "execução de scripts foi desabilitada", use o Prompt de Comando (`cmd`) — veja `PASSO_A_PASSO_SE_TRAVAR.md`, seção "Se você usa Windows".

Confira: `node -v` mostra `v22.12` ou mais (ex.: `v24.x`) e `git --version` mostra uma versão.

## Etapa 1 - Pegar a versão correta do projeto

O projeto tem uma branch própria para alunos:

```text
alunos
```

Cole este prompt no Claude ou Codex:

```text
Clone a branch alunos deste repositório (a branch principal NÃO é a dos alunos):
git clone -b alunos https://github.com/ASP-J/workshop-ai.git

Depois leia o README.md.
Me explique em linguagem simples:
1. o que é este projeto
2. quais arquivos eu preciso conhecer
3. qual é o primeiro passo
4. o que eu devo conferir no navegador

Antes de alterar qualquer coisa, explique o plano.
Depois de alterar, diga quais arquivos mudaram e como eu confiro se funcionou.
```

(Só se o instrutor pedir SSH: troque a linha do clone por `git clone -b alunos git@github.com:ASP-J/workshop-ai.git`.)

Você pode continuar quando a IA confirmar que está na branch:

```text
alunos
```

## Etapa 2 - Entender o desafio antes de mexer

Cole este prompt:

```text
Leia o README.md, o DESAFIO.md e a APOSTILA_CONCEITOS.md.

Não altere arquivos ainda.

Me explique em linguagem simples:
1. qual é o objetivo do projeto
2. o que é a API da Twygo
3. o que é o CSV
4. por que o cruzamento usa e-mail
5. o que a tela final mostra
6. quais arquivos parecem mais importantes

No final, me diga o primeiro passo prático.
```

Você entendeu esta etapa se conseguir explicar:

```text
O painel busca usuários na Twygo, recebe uma planilha CSV, cruza os dados pelo e-mail e mostra o resultado em tabela, cards e gráficos.
```

## Etapa 3 - Preparar o projeto local

Cole este prompt:

```text
Prepare este projeto para rodar localmente.

Instale as dependências necessárias.
Antes de fazer qualquer alteração, explique o plano.
Depois de preparar, me diga:
1. o que foi instalado
2. o que foi configurado
3. quais arquivos mudaram
4. qual URL devo abrir no navegador
5. como eu confiro se funcionou

Explique tudo em linguagem simples.
```

Resultado esperado:

A IA deve preparar o projeto e indicar a URL:

```text
http://localhost:5183
```

Não precisa decorar essa URL.

Guarde apenas a ideia:

```text
localhost = meu próprio computador
```

(A tela usa a porta 5183. O backend local, que guarda o token, usa a porta 5184.)

## Etapa 4 - Configurar o token da Twygo

O instrutor vai entregar um token.

Esse token é a chave para acessar os usuários da Twygo.

**Regra: o token nunca vai para o chat da IA.** Você cola o token direto no arquivo `.env`.

1. Cole este prompt no Claude ou Codex:

   ```text
   Crie o .env a partir do .env.example e abra o arquivo para eu colar o token (não peça nem mostre o token no chat)
   ```

2. A IA cria o arquivo e abre ele num editor de texto:
   - no Mac: `cp .env.example .env` e `open -e .env`
   - no Windows: `copy .env.example .env` e `notepad .env`
3. No editor, procure a linha `TWYGO_API_TOKEN=` e cole o token logo depois do `=` (substituindo o texto de exemplo), sem espaços.
4. Salve o arquivo (Cmd+S no Mac, Ctrl+S no Windows) e feche o editor.
5. Volte para a IA e escreva:

   ```text
   pronto
   ```

Atenção: use **somente o token do workshop** entregue pelo instrutor (ele será revogado depois da aula). Nunca use um token pessoal. Se a IA pedir ou mostrar o token, não responda com ele e avise o instrutor.

Você pode continuar quando tiver salvo o `.env` e dito "pronto".

## Etapa 5 - Abrir o projeto no navegador

Cole este prompt:

```text
Abra o projeto local.

Confira:
1. se o frontend abriu no navegador
2. se o backend está respondendo
3. se a API da Twygo respondeu
4. qual URL eu devo usar

Se der erro, explique em linguagem simples e corrija.
Depois me diga exatamente o que devo ver na tela.
```

O esperado é abrir:

```text
http://localhost:5183
```

Na tela, procure:

- o título "Painel de capacitação"
- o selo "API conectada" no topo
- a área de upload de CSV
- os cards (o card "Usuários na tela" deve mostrar 186)
- a tabela
- os gráficos (antes do CSV eles pedem "Anexe o CSV para gerar este gráfico.")

## Etapa 6 - Entender o que significa API da Twygo

Cole este prompt:

```text
Me explique o que significa conectar na API da Twygo neste projeto.

Explique em linguagem simples:
1. de onde vêm os usuários
2. para que serve o token
3. por que o backend protege o token
4. como o frontend recebe os usuários
5. como eu confiro se a API respondeu
6. por que a API é paginada e como o projeto busca todas as páginas

Não altere arquivos.
Só explique.
```

Resumo que você precisa guardar:

```text
A API da Twygo entrega os usuários, em páginas.
O token autoriza a busca.
O backend usa o token e junta todas as páginas.
A tela mostra os usuários.
```

### A paginação, em linguagem simples

A API da Twygo não devolve todos os usuários de uma vez. Ela entrega **páginas**:

- cada página traz no máximo **100 usuários** (`per_page` vai até 100);
- a resposta informa o total de páginas (`pagination.total_pages`) e o total de usuários (`pagination.total_entries`).

Se você buscar só `page=1&per_page=50`, recebe **50 dos 186 usuários**. Aí só 50 e-mails da planilha encontram alguém, e o painel fica incompleto.

Por isso o projeto **busca todas as páginas**: a tela chama `/api/users?all=true` e o backend local pede página 1, 2, 3... até a última, junta tudo e só então o painel cruza com o CSV.

## Etapa 7 - Conferir se os usuários carregaram

Cole este prompt:

```text
Confira se os usuários da Twygo carregaram corretamente.

Verifique:
1. se a rota local /api/users?all=true respondeu
2. se o backend chamou a API da Twygo e buscou todas as páginas
3. quantos usuários chegaram no frontend
4. se a tela mostra uma tabela de usuários

Não peça, não mostre e não imprima meu token.
Não mostre nomes nem e-mails, só a contagem.
Explique em linguagem simples como você verificou.
```

Você pode continuar quando a IA confirmar **186 usuários** e a tela mostrar "API conectada".

Se não carregar, abra:

```text
PASSO_A_PASSO_SE_TRAVAR.md
```

e use a etapa da API.

## Etapa 8 - Anexar o CSV

O CSV é a planilha de capacitação.

Use o arquivo:

```text
public/capacitacao_workshop.csv
```

Na tela, clique em **Anexar CSV** e escolha esse arquivo, ou clique em **Usar CSV exemplo** (carrega o mesmo arquivo).

Se quiser ajuda, cole este prompt:

```text
Me explique como anexar o CSV no painel.

O arquivo está em:
public/capacitacao_workshop.csv

Explique:
1. onde fica a área de upload
2. como eu escolho o arquivo
3. o que deve acontecer depois de anexar
4. quais colunas o CSV precisa ter
5. como eu confiro se o CSV foi lido
```

O CSV tem estas colunas:

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
```

Você pode continuar quando aparecer, na barra do upload:

```text
capacitacao_workshop.csv · 287 linhas lidas da planilha
```

## Etapa 9 - Entender o cruzamento por e-mail

O cruzamento junta duas fontes:

```text
usuários da Twygo + linhas do CSV
```

A ligação entre elas é:

```text
email
```

Cole este prompt:

```text
Explique como o projeto cruza usuários da Twygo com o CSV.

Use linguagem simples.
Explique:
1. de onde vem o e-mail da Twygo
2. de onde vem o e-mail do CSV
3. o que acontece quando os e-mails são iguais
4. o que acontece quando não existe e-mail correspondente
5. onde eu confiro o resultado na tela

Depois confira se o cruzamento está funcionando.
Me diga só contagens, sem mostrar nomes nem e-mails.
```

Exemplo:

```text
Twygo: ana@empresa.com
CSV: ana@empresa.com
Resultado: Ana aparece com dados de capacitação.
```

Você pode continuar quando a tabela mostrar usuários com dados de capacitação.

## Etapa 10 - Conferir a tabela

A tabela ajuda a responder:

- quem é o usuário
- qual é o e-mail
- qual setor e área aparecem
- quais cursos ou capacitações aparecem
- quantas horas aparecem
- se a pessoa concluiu ou não (coluna Conclusão)

Cole este prompt:

```text
Confira se a tabela do painel está clara.

Ela mostra usuários e dados de capacitação cruzados pelo e-mail.

Explique:
1. quais colunas aparecem
2. quais dados vieram da Twygo
3. quais dados vieram do CSV
4. como eu sei que o cruzamento funcionou
5. por que algumas pessoas aparecem como "Sem dados no CSV"

(Opcional) Se a tabela estiver confusa, sugira uma melhoria de apresentação sem mudar a regra do e-mail.
```

Você pode continuar quando a tabela fizer sentido visualmente.

## Etapa 11 - Conferir os cards

Cards são blocos pequenos de resumo.

Eles servem para bater o olho e entender os números principais.

Cole este prompt:

```text
Confira os cards de resumo do painel.

Explique o que cada card significa:
Usuários na tela, Concluíram, Não concluíram, Horas totais, Cobertura,
Taxa de conclusão, Horas por pessoa, Nota média e Setores.

Explique também a diferença entre "pessoas" e "linhas" do CSV.
Depois diga como eu confiro na tela.
(Opcional) Se eu quiser evoluir, sugira 1 card novo e explique antes de mexer.
```

Você pode continuar quando os cards estiverem preenchidos e baterem com a seção "Como saber se deu certo" abaixo.

## Etapa 12 - Conferir os gráficos

Gráficos ajudam a visualizar os dados.

O painel já traz:

- gráficos de pizza (donut): pessoas por setor, "Concluiu x não concluiu", horas por área, usuários por categoria
- gráficos de barras: horas por setor, taxa de conclusão por setor, top cursos por horas

Cole este prompt:

```text
Confira os gráficos do painel.

Explique o que cada gráfico mostra, por exemplo:
1. horas ou usuários por setor e por área
2. capacitações por categoria
3. quem concluiu x quem não concluiu

Se algum gráfico estiver vazio ou confuso, explique o motivo antes de corrigir.
Depois diga como eu confiro visualmente.
```

Você pode continuar quando os gráficos aparecerem e fizerem sentido.

## Como saber se deu certo

Com o token do workshop e o CSV `capacitacao_workshop.csv`, os números na tela devem ser estes:

| O que conferir | Valor esperado | Onde ver |
| --- | --- | --- |
| Usuários vindos da API (todas as páginas) | **186** | card "Usuários na tela" |
| Linhas do CSV | **287** | barra do upload: "287 linhas lidas da planilha" |
| E-mails diferentes no CSV | **160** | (pergunte para a IA) |
| E-mails que cruzaram com a Twygo | **150** | donut "Concluiu x não concluiu" mostra Total 150 |
| Linhas do CSV que cruzaram | **271** | (pergunte para a IA) |
| E-mails `@anonimizado.com` que não cruzam | **10** (16 linhas) | ficam de fora do painel |
| Usuários sem capacitação no CSV | **36** | tabela: "Sem dados no CSV" |

Cards principais depois de anexar o CSV:

| Card | Valor |
| --- | --- |
| Usuários na tela | 186 |
| Concluíram | 96 |
| Não concluíram | 54 (37 parcial + 17 sem nenhum curso concluído) |
| Horas totais | 2020h |
| Cobertura | 81% (150 de 186 pessoas têm capacitação) |
| Taxa de conclusão | 64% (96 de 150) |
| Horas por pessoa | 13.47h |
| Nota média | 7.89 |
| Setores | 34 |

**Pessoas x linhas.** Uma **linha** do CSV é um curso de uma pessoa. A mesma pessoa pode aparecer em várias linhas (uma por curso). Por isso o CSV tem 287 linhas, mas só 160 pessoas (e-mails diferentes). Os cards contam **pessoas**; a barra do upload conta **linhas**.

**Por que 10 e-mails nunca cruzam?** O CSV tem, de propósito, 10 e-mails com domínio `@anonimizado.com` que **não existem na plataforma** (simulam pessoas que estão na planilha, mas não estão na Twygo, por exemplo quem saiu da empresa). Sem e-mail igual na Twygo, não há com quem cruzar, e essas 16 linhas ficam de fora. (Alguns usuários da própria plataforma também têm e-mail `@anonimizado.com`; esses cruzam normalmente.)

**Se aparecer só 50 cruzados**, o painel está olhando só a primeira página da API (`page=1&per_page=50`). O certo é buscar todas as páginas (veja a Etapa 6).

## Etapa 13 - Conferir a área do usuário

Neste desafio, a área vem do perfil do usuário quando existir.

Cole este prompt:

```text
Confira como o projeto define a área e o setor de cada usuário.

Explique em linguagem simples:
1. se o setor vem do perfil da Twygo
2. qual campo é usado
3. o que acontece se o usuário não tiver setor
4. como setor e área aparecem na tabela e nos gráficos

Não altere arquivos, só explique.
```

Regra esperada:

```text
se tiver área no perfil -> usa a área do perfil
se não tiver -> tenta usar outro campo parecido
se não tiver nada -> mostra Sem area no perfil
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

Arquivos que provavelmente vão aparecer:

- `README.md`
- `DESAFIO.md`
- `APOSTILA_CONCEITOS.md`
- `PASSO_A_PASSO_COMPLETO.md`
- `PASSO_A_PASSO_SE_TRAVAR.md`
- `.env.example`
- `server/index.js`
- `server/twygoApi.js` (busca todas as páginas e filtra os campos que vão para a tela)
- `src/App.jsx`
- `src/trainingCsv.js`
- `src/trainingDashboard.js`
- `public/capacitacao_workshop.csv`

## Etapa 15 - Validar tudo

Cole este prompt:

```text
Valide a entrega final do desafio.

Confira:
1. se a tela abre
2. se a API da Twygo responde
3. se os usuários aparecem (186)
4. se o CSV anexa (287 linhas)
5. se o cruzamento usa e-mail (150 e-mails cruzados)
6. se a tabela aparece
7. se os cards aparecem com os números da seção "Como saber se deu certo"
8. se os gráficos aparecem
9. se a área vem do perfil do usuário quando existir
10. se o token está protegido no .env
11. se o token não aparece na tela nem no chat
12. se o token não aparece no README

Não mostre o token, nomes nem e-mails; só contagens.
Se algo estiver errado, explique e corrija.
Depois me diga, em linguagem simples, se o projeto está pronto para apresentar.
```

Você pode continuar quando a IA confirmar os itens e a tela estiver funcionando.

## Etapa 16 - Preparar a apresentação final

Cole este prompt:

```text
Me ajude a preparar uma apresentação curta do projeto.

Escreva uma fala simples explicando:
1. qual problema o painel resolve
2. o que vem da API da Twygo
3. o que vem do CSV
4. como o e-mail cruza os dados
5. o que os cards mostram
6. o que os gráficos mostram
7. por que o token fica protegido

Use linguagem natural, como se eu fosse apresentar para a turma.
```

Frase base:

```text
Eu rodei, entendi e evoluí um painel local que busca usuários na API da Twygo, recebe um CSV de capacitação, cruza os dados pelo e-mail e mostra indicadores em tabela, cards e gráficos.
```

## Etapa 17 - Se perguntarem o que você aprendeu

Você pode responder:

```text
Aprendi a usar Claude ou Codex para rodar, entender e evoluir um sistema local, conectar em uma API paginada, proteger um token, anexar um CSV e cruzar dados pelo e-mail.
```

Ou:

```text
Aprendi que a IA ajuda muito, mas eu preciso saber pedir, conferir e entender o fluxo dos dados.
```

## Checklist final do aluno

Antes de dizer que terminou, confira:

- estou na branch `alunos`
- li o README
- entendi o desafio
- pedi para a IA preparar o projeto
- colei o token direto no `.env` (não no chat) e disse "pronto"
- a tela abriu
- a API da Twygo respondeu ("API conectada", 186 usuários)
- anexei o CSV (287 linhas lidas da planilha)
- a tabela cruzou por e-mail
- os cards apareceram com os números esperados
- os gráficos apareceram
- a área aparece nos dados
- o token não aparece na tela nem no chat
- consigo explicar o projeto em voz alta

## Quando usar o documento de emergência

Use:

```text
PASSO_A_PASSO_SE_TRAVAR.md
```

quando:

- a tela não abrir
- a API não responder
- o token der erro
- o CSV não anexar
- a tabela não cruzar
- os números não baterem
- os gráficos não aparecerem
- você se perder no meio da aula

## Resumo de uma linha

```text
Twygo entrega usuários (em páginas), CSV entrega capacitações, e-mail junta os dois, painel mostra tabela, cards e gráficos.
```
