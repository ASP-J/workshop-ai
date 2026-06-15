# Workshop AI - Painel de Capacitacao Twygo

Esta e a **versao dos alunos** do repositorio.

Se voce esta vendo esta pagina no GitHub, confira se a branch selecionada e:

```text
alunos
```

Se voce estiver usando Claude ou Codex, comece pedindo para a IA pegar a versao dos alunos:

```text
Clone a branch alunos deste repositorio:
git@github.com:ASP-J/workshop-ai.git

Depois leia o README.md e me guie passo a passo, em linguagem simples.
Antes de fazer qualquer alteracao, explique o que voce vai fazer e por que.
Depois de cada alteracao, explique o que mudou, quais arquivos foram alterados e como eu confiro se funcionou.
```

Se o instrutor pedir o link em HTTPS, use:

```text
Clone a branch alunos deste repositorio:
https://github.com/ASP-J/workshop-ai.git

Depois leia o README.md e me guie passo a passo, em linguagem simples.
Antes de fazer qualquer alteracao, explique o que voce vai fazer e por que.
Depois de cada alteracao, explique o que mudou, quais arquivos foram alterados e como eu confiro se funcionou.
```

Este repositorio e o ponto de partida do desafio.

Voce vai usar Claude ou Codex para criar um painel que conecta a API da Twygo com uma planilha CSV de capacitacao.

O objetivo nao e decorar codigo.

O objetivo e aprender este fluxo:

```text
prompt para IA -> IA altera o projeto -> voce confere no navegador -> voce pede ajustes
```

## Regra de ouro para usar a IA

Sempre peca para Claude ou Codex explicar o que esta fazendo.

Use esta regra em todos os prompts:

```text
Explique cada passo em linguagem simples.
Antes de alterar arquivos, diga o que voce pretende fazer.
Depois de alterar, diga:
1. o que mudou
2. por que mudou
3. quais arquivos foram alterados
4. como eu confiro se funcionou
5. qual e o proximo passo
Nao esconda a explicacao atras de termos tecnicos.
```

Se a IA responder de forma muito tecnica, mande:

```text
Explica de novo como se eu nunca tivesse programado.
Use exemplos deste projeto.
```

Se a IA fizer muitas coisas de uma vez e voce se perder, mande:

```text
Para um pouco.
Resume o que voce ja fez, em ordem.
Depois me diga exatamente o que eu devo conferir agora.
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

## O que significa conectar na API da Twygo

Quando o desafio falar em **conectar**, **ligar** ou **chamar** a API da Twygo, significa:

```text
usar o token entregue pelo instrutor para buscar usuarios reais da plataforma Twygo
```

Voce nao precisa saber todos os detalhes tecnicos da API.

O que voce precisa entender e:

1. A Twygo guarda os usuarios.
2. A API e o caminho para buscar esses usuarios.
3. O token e a chave que autoriza essa busca.
4. O backend local usa esse token para falar com a Twygo.
5. A tela mostra os usuarios que vieram dessa busca.

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
Para cada arquivo importante, explique:
- para que ele serve
- se o aluno precisa mexer nele ou so entender
- como ele participa do desafio
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
Configure o arquivo .env com este token da Twygo:
[cole aqui o token recebido do instrutor]

Salve esse valor na variavel TWYGO_API_TOKEN.
Nao mostre, nao repita e nao imprima meu token na resposta.
No final, apenas confirme que o .env foi configurado.
Explique o que e dependencia, o que e .env e por que o token precisa ficar protegido.
Depois diga quais arquivos voce alterou ou criou.
```

Atencao:

- nao cole o token no README
- nao cole o token no frontend
- nao publique o token no GitHub
- nao mande print com token aparecendo
- cole o token apenas no prompt para a IA configurar o `.env`

## Passo 3 - Peca para abrir o projeto local

Depois que a IA confirmar que configurou o `.env`, envie:

```text
Abra o projeto local.
Confira se o frontend abriu no navegador.
Confira se o backend esta respondendo.
Confira se a API da Twygo respondeu.
Se der erro, explique em linguagem simples e corrija.
Explique tambem:
- o que e frontend
- o que e backend
- o que significa a API da Twygo responder
- qual URL eu devo abrir no navegador
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
Antes de corrigir, me diga quais sao as 3 causas mais provaveis.
Depois de corrigir, me diga como conferir se os usuarios carregaram.
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
Explique o que significa cruzar dados.
Mostre um exemplo simples usando um email ficticio.
Depois diga onde no projeto essa regra ficou implementada.
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
Antes de implementar, explique quais indicadores fazem sentido para este desafio.
Depois de implementar, explique o que cada card e cada grafico significa.
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
No final, gere um resumo em 5 frases para eu conseguir apresentar o projeto para outra pessoa.
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
Antes de corrigir, me diga:
1. qual parte provavelmente quebrou
2. por que isso pode ter acontecido
3. o que voce vai tentar primeiro

Depois de corrigir, me diga como eu confiro que resolveu.
```

## Prompt para pedir explicacao de qualquer coisa

Use este prompt sempre que alguma parte parecer confusa:

```text
Nao entendi essa parte.
Explique com calma, em linguagem simples.
Use o exemplo deste projeto.
Me diga:
1. o que isso e
2. para que serve
3. onde aparece no projeto
4. o que acontece se estiver errado
5. como eu confiro se esta funcionando
```

## Prompt para pedir resumo do que ja foi feito

Use quando voce sentir que se perdeu:

```text
Resume o que ja foi feito ate agora no projeto.
Organize em ordem:
1. o que foi configurado
2. o que foi criado
3. quais arquivos mudaram
4. o que ja esta funcionando
5. o que ainda falta fazer
Explique como se eu estivesse acompanhando uma aula.
```

## Prompt para pedir explicacao dos arquivos alterados

Use depois que a IA mexer no projeto:

```text
Liste os arquivos que voce alterou.
Para cada arquivo, explique:
1. por que ele foi alterado
2. o que ele faz no projeto
3. qual parte do desafio depende dele
4. como eu posso conferir se a alteracao funcionou
Nao use linguagem tecnica demais.
```

## Checklist antes de chamar o instrutor

Confira:

- pedi para a IA preparar o projeto
- passei o token para a IA configurar o `.env`
- a IA confirmou que salvou o token em `TWYGO_API_TOKEN`
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
