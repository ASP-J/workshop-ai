# Passo a passo se voce travar

Este documento e para quando voce pensar:

```text
nao sei o que fazer agora
```

ou:

```text
deu erro e eu nao entendi nada
```

Respira. O objetivo da aula nao e voce saber programar tudo sozinho.

O objetivo e voce saber pedir ajuda para Claude ou Codex, conferir o resultado e entender o fluxo geral.

## Regra principal

Nao tente adivinhar.

Quando travar, copie um prompt deste documento e cole no Claude ou Codex.

Sempre peca para a IA explicar:

```text
Explique em linguagem simples, como se eu nunca tivesse programado.
```

## Antes de comecar

Voce precisa ter recebido do instrutor:

1. Link do repositorio.
2. Token da Twygo.
3. CSV de capacitacao.
4. Orientacao para usar Claude ou Codex.

O repositorio certo para alunos e a branch:

```text
alunos
```

## Passo 0 - Se voce nem conseguiu pegar o projeto

Cole este prompt no Claude ou Codex:

```text
Clone a branch alunos deste repositorio:
https://github.com/ASP-J/workshop-ai.git

Depois leia o README.md.
Me explique, em linguagem simples:
1. o que e este projeto
2. quais arquivos eu preciso conhecer
3. qual e o primeiro passo
4. o que eu devo conferir no navegador

Antes de alterar qualquer coisa, explique o plano.
Depois de alterar, diga quais arquivos mudaram e como eu confiro se funcionou.
```

Se o instrutor pediu para usar SSH, use este no lugar:

```text
Clone a branch alunos deste repositorio:
git@github.com:ASP-J/workshop-ai.git

Depois leia o README.md.
Me explique, em linguagem simples:
1. o que e este projeto
2. quais arquivos eu preciso conhecer
3. qual e o primeiro passo
4. o que eu devo conferir no navegador

Antes de alterar qualquer coisa, explique o plano.
Depois de alterar, diga quais arquivos mudaram e como eu confiro se funcionou.
```

## Passo 1 - Se voce nao sabe o que o projeto faz

Cole este prompt:

```text
Estou no projeto do desafio Painel de Capacitacao com API Twygo + CSV.
Leia o README.md e o DESAFIO.md.

Me explique em linguagem simples:
1. qual e o objetivo do desafio
2. o que significa API da Twygo
3. o que significa CSV
4. por que o cruzamento e feito por email
5. o que eu preciso mostrar no final

Nao altere arquivos ainda.
So me explique.
```

Voce entendeu o passo se conseguir repetir esta frase:

```text
O sistema busca usuarios na Twygo, recebe uma planilha CSV, cruza tudo pelo email e mostra tabela, cards e graficos.
```

## Passo 2 - Se voce nao sabe preparar o projeto

Cole este prompt:

```text
Prepare este projeto para rodar localmente.

Faca tudo que for necessario para o projeto abrir no navegador.
Explique cada passo em linguagem simples.

Antes de alterar arquivos, me diga o plano.
Depois de alterar, me diga:
1. quais arquivos mudaram
2. o que foi instalado ou configurado
3. qual URL devo abrir no navegador
4. como eu confiro se funcionou
```

O resultado esperado e a IA dizer que o projeto pode abrir em algo parecido com:

```text
http://localhost:5183
```

## Passo 3 - Se voce recebeu o token mas nao sabe onde colocar

Voce nao precisa abrir o arquivo `.env` manualmente.

Cole este prompt e substitua a linha indicada pelo token recebido do instrutor:

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

Importante:

- nao tire print com o token aparecendo
- nao mande o token em grupo
- nao cole o token em arquivo publico
- se a IA repetir seu token na resposta, avise o instrutor

## Passo 4 - Se a tela nao abriu

Cole este prompt:

```text
A tela do projeto nao abriu no navegador.

Confira o que aconteceu.
Explique em linguagem simples:
1. se o frontend esta rodando
2. se o backend esta rodando
3. qual URL eu devo abrir
4. se existe algum erro no terminal

Se precisar corrigir, corrija.
Depois me diga exatamente como eu confiro se a tela abriu.
```

O resultado esperado e conseguir abrir:

```text
http://localhost:5183
```

## Passo 5 - Se a API da Twygo nao respondeu

Cole este prompt:

```text
A API da Twygo nao respondeu ou os usuarios nao apareceram.

Verifique:
1. se o arquivo .env existe
2. se TWYGO_API_TOKEN esta configurado
3. se o backend esta lendo o token
4. se a chamada para a API da Twygo usa Authorization: Bearer
5. se apareceu erro 401, 403, 404 ou 500

Nao mostre meu token na resposta.
Explique a causa provavel em linguagem simples.
Se puder corrigir, corrija.
Depois me diga como eu confiro se os usuarios carregaram.
```

Como entender os erros:

- `401`: normalmente token ausente, errado ou vencido
- `403`: token sem permissao
- `404`: endereco da API errado
- `500`: erro no servidor ou na chamada

## Passo 6 - Se voce nao sabe anexar o CSV

O arquivo de exemplo fica aqui:

```text
public/sample-capacitacao.csv
```

Cole este prompt:

```text
Me explique como anexar o CSV no painel.
O arquivo esta em public/sample-capacitacao.csv.

Explique:
1. onde fica o botao ou area de upload
2. o que deve acontecer depois que eu anexar
3. quais colunas o CSV precisa ter
4. como eu confiro se o CSV foi lido
```

O CSV precisa ter colunas como:

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
```

## Passo 7 - Se o CSV anexou mas nao cruzou os dados

Cole este prompt:

```text
O CSV foi anexado, mas os dados nao parecem cruzados com os usuarios da Twygo.

Confira se o cruzamento esta sendo feito pelo campo email.
Explique em linguagem simples:
1. o que significa cruzar dados
2. de onde vem o email da Twygo
3. de onde vem o email do CSV
4. o que acontece quando os emails sao iguais
5. o que acontece quando os emails nao batem

Se a regra estiver errada, corrija.
Depois me diga como conferir na tabela.
```

Exemplo simples:

```text
Twygo: ana@empresa.com
CSV: ana@empresa.com
Resultado: Ana aparece com os dados de capacitacao.
```

## Passo 8 - Se os cards ou graficos nao aparecem

Cole este prompt:

```text
Os cards ou graficos nao apareceram corretamente.

Confira se o painel mostra:
1. total de usuarios
2. usuarios encontrados no CSV
3. total de horas de capacitacao
4. media de horas
5. grafico por area
6. grafico por categoria ou status

Explique o que cada indicador significa.
Se faltar algo, implemente de forma simples.
Depois me diga como conferir na tela.
```

## Passo 9 - Se a IA ficou tecnica demais

Cole este prompt:

```text
Nao entendi sua explicacao.
Explique de novo como se eu nunca tivesse programado.

Use este formato:
1. o que aconteceu
2. por que aconteceu
3. o que voce fez
4. como eu confiro
5. qual e o proximo passo

Use exemplos deste projeto.
```

## Passo 10 - Se voce se perdeu no meio da aula

Cole este prompt:

```text
Eu me perdi no meio do desafio.

Resume tudo que ja foi feito ate agora.
Organize assim:
1. o que ja esta funcionando
2. o que ainda falta fazer
3. quais arquivos foram alterados
4. o que eu devo conferir no navegador
5. qual e o proximo passo mais simples

Explique em linguagem simples.
```

## Passo 11 - Se voce quer validar a entrega final

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
9. se o token esta protegido no .env
10. se o token nao aparece na tela nem no README

Se algo estiver errado, explique e corrija.
Depois gere um resumo simples para eu apresentar para o instrutor.
```

## Checklist visual

Antes de chamar o instrutor, confira:

- a tela abriu no navegador
- aparecem usuarios da Twygo
- o CSV foi anexado
- a tabela tem usuarios e dados de capacitacao
- existe pelo menos um card de resumo
- existe pelo menos um grafico
- o token nao aparece na tela
- voce consegue explicar o que e API
- voce consegue explicar o que e CSV
- voce consegue explicar que o cruzamento e pelo email

## Frase para apresentar no final

Use esta frase:

```text
Eu usei Claude ou Codex para criar um painel local que busca usuarios na API da Twygo, recebe um CSV de capacitacao, cruza os dados pelo email e mostra os resultados em tabela, cards e graficos.
```

Se perguntarem por que tem backend:

```text
Porque o backend protege o token da API. A tela chama o backend, e o backend chama a Twygo.
```

Se perguntarem o que voce aprendeu:

```text
Aprendi que a IA pode ajudar a construir o sistema, mas eu preciso saber pedir, conferir e entender o fluxo dos dados.
```

## Se nada funcionar

Cole este prompt:

```text
Nada esta funcionando e eu preciso de um diagnostico simples.

Nao altere tudo de uma vez.
Primeiro investigue e me diga:
1. qual e o problema mais provavel
2. qual arquivo ou configuracao pode estar envolvido
3. qual teste simples podemos fazer agora
4. o que voce recomenda tentar primeiro

Depois espere minha confirmacao antes de fazer uma mudanca grande.
```

Depois chame o instrutor com:

```text
Eu travei nesta etapa:
[diga a etapa]

O erro que apareceu foi:
[cole o erro]

Eu ja tentei:
[diga o que voce tentou]

A IA acha que o problema pode ser:
[cole o resumo da IA]
```
