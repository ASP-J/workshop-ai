# Workshop AI - Painel de Capacitacao Twygo

Este repositorio e o ponto de partida do desafio.

Voce vai usar Claude ou Codex para criar um painel que conecta a API da Twygo com uma planilha CSV de capacitacao.

O objetivo nao e decorar codigo.

O objetivo e aprender este fluxo:

```text
prompt para IA -> IA altera o projeto -> voce confere no navegador -> voce pede ajustes
```

## O que voce vai construir

Um painel local chamado:

```text
Painel de capacitacao
```

Ele deve:

1. Buscar usuarios na API da Twygo.
2. Receber um CSV de capacitacao.
3. Cruzar usuarios + CSV pelo `email`.
4. Mostrar uma tabela com os dados cruzados.
5. Mostrar cards de resumo.
6. Mostrar graficos por area, categoria e status.
7. Proteger o token da API usando `.env`.

## Materiais da aula

Leia nesta ordem:

1. `DESAFIO.md`
   - Enunciado do desafio.
   - Explica o que voce precisa entregar.

2. `APOSTILA_CONCEITOS.md`
   - Explica conceitos como API, frontend, backend, CSV, token e `.env`.
   - Leia se alguma palavra parecer confusa.

3. `public/sample-capacitacao.csv`
   - CSV de exemplo para anexar no painel.

## Passo 1 - Peca para a IA entender o projeto

Abra Claude ou Codex e envie:

```text
Estou no desafio do Painel de Capacitacao com API Twygo + CSV.
Leia os arquivos do projeto e me explique, em linguagem simples, o que ja existe.
Depois me diga qual deve ser meu primeiro passo.
Nao use explicacao tecnica demais.
```

Confira se a IA mencionou:

- API da Twygo
- CSV de capacitacao
- cruzamento por email
- frontend
- backend
- `.env`

## Passo 2 - Peca para preparar o projeto

Envie:

```text
Prepare este projeto para rodar localmente.
Instale as dependencias necessarias.
Crie o arquivo .env a partir do .env.example.
Me diga exatamente onde devo colar o token da Twygo.
Nao mostre meu token real na resposta.
```

Depois disso, coloque o token real no arquivo `.env`.

O token deve ficar nesta variavel:

```text
TWYGO_API_TOKEN=
```

Atencao:

- nao cole o token no README
- nao cole o token no frontend
- nao publique o token no GitHub
- nao mande print com token aparecendo

## Passo 3 - Peca para abrir o projeto local

Depois de colocar o token no `.env`, envie:

```text
Abra o projeto local.
Confira se o frontend abriu no navegador.
Confira se o backend esta respondendo.
Confira se a API da Twygo respondeu.
Se der erro, explique em linguagem simples e corrija.
```

O navegador deve abrir em algo parecido com:

```text
http://localhost:5183
```

## Passo 4 - Confira se os usuarios carregaram

Na tela, procure sinais de que os usuarios da Twygo carregaram.

Se nao aparecer nada, envie:

```text
Os usuarios da Twygo nao apareceram na tela.
Verifique a chamada da API, o backend local e o token do .env.
Explique o problema em linguagem simples e corrija.
Nao mostre meu token na resposta.
```

## Passo 5 - Anexe o CSV

Use o arquivo:

```text
public/sample-capacitacao.csv
```

Na tela do painel, anexe esse CSV.

O CSV tem colunas como:

- `email`
- `area`
- `categoria`
- `curso`
- `horas_capacitacao`
- `status_capacitacao`
- `nota`
- `concluido_em`

## Passo 6 - Confira o cruzamento por email

O sistema precisa juntar:

```text
usuarios da API + linhas do CSV
```

usando:

```text
email
```

Se a tabela nao cruzar os dados, envie:

```text
O CSV foi anexado, mas os dados nao parecem cruzados com os usuarios.
Confira se o cruzamento esta sendo feito pelo campo email.
Mostre uma explicacao simples do problema e corrija.
```

## Passo 7 - Confira cards e graficos

O painel precisa mostrar pelo menos:

- cards de resumo
- tabela de usuarios
- dados de capacitacao
- grafico de pizza ou donut
- grafico de barras

Se faltar alguma coisa, envie:

```text
Confira se o painel tem cards, tabela e graficos.
Se faltar algo, implemente de forma simples e visual.
O foco e mostrar dados cruzados de capacitacao por area, categoria e status.
```

## Passo 8 - Valide a entrega final

Envie este prompt:

```text
Valide a entrega final do desafio.
Confira:
- se a tela abre
- se a API da Twygo responde
- se o CSV anexa
- se o cruzamento usa email
- se os cards aparecem
- se a tabela aparece
- se os graficos aparecem
- se o token esta protegido no .env

Se algo estiver errado, corrija.
Depois me explique o resultado em linguagem simples.
```

## Se der erro

Nao escreva apenas:

```text
nao funcionou
```

Escreva assim:

```text
Deu este erro no desafio:
[cole o erro completo aqui]

Eu esperava que:
[explique o que voce esperava]

Me explique o motivo em linguagem simples e corrija.
```

## Checklist antes de chamar o instrutor

Confira:

- pedi para a IA preparar o projeto
- criei o `.env`
- coloquei o token real no `.env`
- a tela abriu no navegador
- a API da Twygo respondeu
- anexei o CSV
- a tabela apareceu
- os cards apareceram
- os graficos apareceram
- o token nao apareceu na tela
- consigo explicar o fluxo do projeto

## Como explicar no final

Use esta frase:

```text
Eu criei um painel local que busca usuarios na API da Twygo, recebe um CSV de capacitacao, cruza os dados pelo email e mostra indicadores em cards, tabela e graficos.
```

Se perguntarem por que existe backend:

```text
Porque o backend protege o token. A tela chama o backend, e o backend chama a API da Twygo.
```

Se perguntarem por que usamos CSV:

```text
Porque o CSV representa uma planilha externa de capacitacao que precisa ser cruzada com os usuarios da plataforma.
```

## Resumo do fluxo

```text
Twygo -> API -> backend -> frontend -> CSV -> cruzamento por email -> cards e graficos
```

Se voce entendeu esse fluxo, voce entendeu a parte mais importante do desafio.
