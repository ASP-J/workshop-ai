# Desafio - Painel de Capacitação com API Twygo + CSV

## Contexto

Você trabalha em uma empresa que usa a Twygo para gerenciar usuários e treinamentos.

A empresa quer um painel simples para responder perguntas como:

- Quantas pessoas aparecem na base da Twygo?
- Quais pessoas também aparecem na planilha de capacitação?
- Quantas horas de capacitação cada área tem?
- Quais categorias de curso aparecem mais?
- Quais usuários estão com dados cruzados corretamente?

O painel já vem pronto na branch `alunos`: ele conecta a API da Twygo com uma planilha CSV e mostra os resultados de forma visual.

O objetivo do desafio é **rodar, entender, conferir e evoluir** esse painel com ajuda da IA.

Quando este documento falar em **API da Twygo**, entenda assim:

```text
é o caminho que o sistema usa para buscar usuários reais cadastrados na Twygo
```

Para acessar essa API, o instrutor vai entregar um token.

Você não precisa decorar detalhes técnicos da API. Você precisa saber que:

1. A API entrega os usuários.
2. O token autoriza o acesso.
3. O backend local protege o token.
4. A tela mostra os usuários recebidos.

## A API entrega os usuários em páginas

A API da Twygo é **paginada**: ela não devolve todo mundo de uma vez.

- Cada página traz no máximo 100 usuários (`per_page` vai até 100).
- A resposta diz quantas páginas existem (`pagination.total_pages`) e quantos usuários existem no total (`pagination.total_entries`).

Se alguém buscar só a primeira página com `page=1&per_page=50`, recebe **50 dos 186 usuários**, e o cruzamento com a planilha fica incompleto (só 50 e-mails cruzam em vez de 150).

Por isso o projeto **busca todas as páginas** antes de cruzar com o CSV: a tela chama `/api/users?all=true` e o backend local pede página por página até a última.

## Como você vai trabalhar

Neste desafio, você vai usar Claude ou Codex.

Você não precisa escrever tudo sozinho.

O formato esperado é:

```text
você dá prompts -> a IA roda/explica/ajusta o projeto -> você confere o resultado -> você pede ajustes
```

Não tenha vergonha de pedir explicação.

Um bom prompt é melhor do que tentar adivinhar.

Neste desafio, a IA deve explicar o que está fazendo.

Sempre que pedir algo para Claude ou Codex, inclua esta instrução:

```text
Explique cada passo em linguagem simples.
Antes de alterar arquivos, diga o que você vai fazer e por quê.
Depois de alterar, diga quais arquivos mudaram, por que mudaram e como eu confiro se funcionou.
```

O objetivo não é apenas ver o painel funcionando.

O objetivo é você conseguir explicar:

1. de onde vieram os usuários
2. de onde veio o CSV
3. como os dados foram cruzados
4. por que o token fica protegido
5. o que os cards e gráficos mostram

## O que você vai receber

O instrutor vai entregar:

1. Link do repositório do projeto (use a branch `alunos`: `git clone -b alunos https://github.com/ASP-J/workshop-ai.git`).
2. Token da API da Twygo (token só do workshop, revogado depois da aula).
3. Arquivo CSV de capacitação (`public/capacitacao_workshop.csv`, que já vem no projeto).
4. Apostila de conceitos.

O CSV já vem pronto.

Você não precisa criar os dados da planilha.

## Missão do desafio

Rodar, entender, conferir e evoluir o painel local chamado:

```text
Painel de capacitação
```

Esse painel já faz (e você confere que funciona):

1. Busca todos os usuários reais na API da Twygo (todas as páginas).
2. Permite anexar um CSV de capacitação.
3. Cruza os usuários da API com os dados do CSV usando o e-mail.
4. Mostra uma listagem de usuários com os dados cruzados.
5. Mostra cards de resumo.
6. Mostra gráficos por setor, área, categoria e "Concluiu x não concluiu".
7. Protege o token da API usando `.env`.

## Regra principal do cruzamento

O cruzamento é feito pelo campo:

```text
email
```

Se o e-mail do usuário na Twygo for igual ao e-mail de uma linha do CSV, os dados são juntados.

Exemplo:

```text
API da Twygo:
ana@empresa.com - Ana Silva

CSV:
ana@empresa.com - 6 horas de capacitação

Resultado:
Ana Silva - 6 horas de capacitação
```

Se o e-mail do CSV não existir na Twygo, a linha fica de fora. O CSV do workshop tem, de propósito, 10 e-mails `@anonimizado.com` que não existem na plataforma, para você ver isso acontecer.

## Regra sobre área

A área vem do perfil do usuário na Twygo sempre que existir.

Regra esperada:

1. Se o usuário tem área/departamento no perfil, usar essa área.
2. Se não tiver área, tentar usar algum campo parecido do perfil.
3. Se não existir nada, mostrar `Sem area no perfil`.

Áreas esperadas no desafio:

- Diretoria Executiva
- Backoffice
- Financeiro
- Recursos Humanos
- Gestão de conteúdo
- Conteúdo
- Marketing
- Geração de Leads
- Design de Marketing
- Sucesso do Cliente
- Atendimento
- Engajamento
- Produto e Qualidade
- Engenharia de Produto
- Qualidade e Testes
- Sustentação
- Vendas
- Qualificação
- Soluções
- Engenharia
- Arquitetura Tecnológica
- Desenvolvimento
- Business Intelligence
- Dados e Hubspot

## Formato do CSV

O CSV tem estas colunas:

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
```

O instrutor fornece o arquivo pronto: `public/capacitacao_workshop.csv`.

Você só precisa anexar o CSV no painel (ou clicar em "Usar CSV exemplo").

## O que a tela tem (confira cada item)

O painel já vem com:

1. Título claro do painel.
2. Área para anexar o CSV.
3. Status da conexão com a API da Twygo.
4. Cards de resumo.
5. Lista ou tabela de usuários.
6. Dados cruzados de capacitação.
7. Gráfico de pizza ou donut.
8. Gráfico de barras.
9. Mensagem amigável quando faltar CSV.
10. Mensagem amigável quando acontecer erro.

## Números esperados

Com o token do workshop e o CSV `capacitacao_workshop.csv`:

- 186 usuários vindos da API (todas as páginas)
- 287 linhas no CSV, de 160 e-mails diferentes
- 150 e-mails cruzados (271 linhas); 10 e-mails `@anonimizado.com` não cruzam
- 36 usuários sem capacitação no CSV
- Cards: Concluíram 96 · Não concluíram 54 · Horas totais 2020h · Cobertura 81% · Setores 34

A explicação completa (incluindo a diferença entre **pessoas** e **linhas**) está na seção "Como saber se deu certo" do `README.md`.

## Cards de resumo

O painel já traz cards de resumo. Ideias de cards extras, se quiser evoluir (opcional):

- Total de usuários da Twygo
- Usuários encontrados no CSV
- Total de horas de capacitação
- Média de horas por usuário
- Cursos concluídos
- Áreas com capacitação

## Gráficos

O painel já traz gráficos (incluindo "Concluiu x não concluiu"). Ideias de gráficos extras, se quiser evoluir (opcional):

- Donut por área
- Donut "Concluiu x não concluiu" (já existe)
- Barras por categoria
- Barras por horas de capacitação por área

## O que não pode fazer

Não cole o token no chat da IA: a IA abre o `.env` e você cola o token direto no arquivo.

Não coloque o token da Twygo dentro do frontend.

Não publique o token no GitHub.

Não use token pessoal: use só o token do workshop entregue pelo instrutor.

Não publique o painel em servidor ou nuvem: ele roda só no seu computador (localhost).

Não cole token, nomes ou e-mails reais em prints.

Antes de publicar qualquer coisa, peça auditoria para o João, a Adriana ou um dev.

Não apague arquivos do projeto sem pedir para a IA explicar antes.

Não use dados negativos, ofensivos ou constrangedores na planilha.

Não transforme o painel em uma busca manual. O objetivo é mostrar uma listagem cruzada e gráficos.

## Como pedir para Claude ou Codex começar

Use este prompt:

```text
Quero rodar, entender e evoluir o Painel de capacitação com API Twygo + CSV (ele já vem pronto na branch alunos).
Leia os arquivos do projeto e me explique o que já existe.
Depois me diga, em linguagem simples, qual será o primeiro passo.
Não escreva explicação técnica demais.
Explique também quais arquivos parecem importantes e para que cada um serve.
```

Depois use:

```text
Prepare o projeto para rodar localmente.
Instale as dependências necessárias.
Explique por que o token deve ficar no .env e não dentro da tela.
```

Para o token, use **sempre** este fluxo (o token nunca vai para o chat):

1. Envie para a IA:

   ```text
   Crie o .env a partir do .env.example e abra o arquivo para eu colar o token (não peça nem mostre o token no chat)
   ```

2. A IA abre o arquivo no editor (`open -e .env` no Mac, `notepad .env` no Windows).
3. Cole o token logo depois de `TWYGO_API_TOKEN=`, salve e feche o editor.
4. Volte para a IA e escreva `pronto`.

Atenção: use **somente o token do workshop** entregue pelo instrutor (ele será revogado depois da aula). Nunca use um token pessoal.

Depois do "pronto":

```text
Abra o projeto local e confira se a API da Twygo está respondendo.
Se der erro, explique em linguagem simples e corrija.
Explique o que você está conferindo em cada parte: frontend, backend e API.
```

## Prompts permitidos durante o desafio

Para pedir que a IA explique antes de mexer:

```text
Antes de alterar qualquer arquivo, me explique o plano.
Diga:
1. o que você vai fazer
2. por que isso é necessário
3. quais arquivos provavelmente serão alterados
4. como vamos conferir se deu certo
Use linguagem simples.
```

Para pedir que a IA explique depois de mexer:

```text
Agora me explique o que você acabou de fazer.
Diga:
1. quais arquivos foram alterados
2. o que mudou em cada arquivo
3. por que essa mudança ajuda no desafio
4. como eu confiro o resultado
5. qual é o próximo passo
```

Para entender uma parte:

```text
Explique o que esse arquivo faz usando o exemplo do nosso desafio.
Fale como se eu nunca tivesse programado.
Me diga se eu preciso mexer nele ou apenas entender.
```

Para evoluir o painel (opcional):

```text
Melhore essa tela para ficar mais clara para uma pessoa de RH ou treinamento.
Não mude a regra de cruzamento por e-mail.
Antes de alterar, explique o que você vai melhorar.
Depois de alterar, explique como conferir na tela.
```

Para corrigir erro:

```text
Deu este erro:
[cole o erro aqui, sem o token]
Explique o motivo em linguagem simples e corrija.
Antes de corrigir, diga qual é a causa mais provável.
Depois de corrigir, diga como eu testo novamente.
```

Para validar:

```text
Confira se o painel atende ao desafio:
- busca todos os usuários da Twygo (todas as páginas)
- anexa CSV
- cruza por e-mail
- mostra cards
- mostra tabela
- mostra gráficos
- protege o token no .env
- os números batem com "Como saber se deu certo" do README
Se algo estiver quebrado, explique o motivo e corrija.
Depois explique o que foi corrigido e como eu apresento isso para o instrutor.
```

## Entrega esperada

No final, você deve conseguir mostrar:

1. O painel aberto no navegador.
2. Usuários carregados da Twygo (186).
3. CSV anexado (287 linhas lidas da planilha).
4. Tabela com dados cruzados.
5. Cards de resumo preenchidos.
6. Gráficos aparecendo.
7. Token protegido no `.env`.

## Critérios de sucesso

O desafio está correto se:

- A tela abre sem erro.
- A API da Twygo responde.
- O CSV é aceito.
- O cruzamento usa `email`.
- A listagem mostra usuários e capacitações.
- Os cards fazem sentido (e batem com os números esperados).
- Os gráficos aparecem.
- O token não aparece na tela nem no chat.
- O token não aparece no GitHub.
- A explicação final do aluno faz sentido.
- O aluno consegue explicar, com suas palavras, o que a IA fez no projeto.

## Apresentação final

Quando terminar, explique em voz alta:

```text
Eu rodei, entendi e evoluí um painel local que busca usuários na API da Twygo, recebe um CSV de capacitação, cruza os dados pelo e-mail e mostra indicadores em cards, tabela e gráficos.
```

Se perguntarem por que existe backend:

```text
Porque o backend protege o token da API. A tela chama o backend, e o backend chama a Twygo.
```

Se perguntarem por que usamos CSV:

```text
Porque o CSV representa uma planilha externa de capacitação que precisa ser cruzada com os usuários da plataforma.
```

## Dica final

Não tente decorar o código.

Tente entender o fluxo:

```text
API da Twygo (todas as páginas) -> usuários
CSV -> capacitações
e-mail -> cruzamento
painel -> cards, tabela e gráficos
```

Se você consegue explicar esse fluxo, você entendeu o desafio.
