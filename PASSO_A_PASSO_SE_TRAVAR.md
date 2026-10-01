# Passo a passo se você travar

Este documento é para quando você pensar:

```text
não sei o que fazer agora
```

ou:

```text
deu erro e eu não entendi nada
```

Respira. O objetivo da aula não é você saber programar tudo sozinho.

O objetivo é você saber pedir ajuda para Claude ou Codex, conferir o resultado e entender o fluxo geral.

## Regra principal

Não tente adivinhar.

Quando travar, copie um prompt deste documento e cole no Claude ou Codex.

Sempre peça para a IA explicar:

```text
Explique em linguagem simples, como se eu nunca tivesse programado.
```

E lembre: **o token nunca vai para o chat da IA.** Nem para pedir ajuda. Se for colar um erro, confira antes se o token não aparece nele.

## Antes de começar

Você precisa ter recebido do instrutor:

1. Link do repositório.
2. Token da Twygo (só do workshop).
3. CSV de capacitação (já vem no projeto: `public/capacitacao_workshop.csv`).
4. Orientação para usar Claude ou Codex.

O repositório certo para alunos é a branch:

```text
alunos
```

## Antes do Passo 0 - Se o computador ainda não está pronto

Sintomas: `git`, `node`, `npm` ou `claude` "não é reconhecido" / "command not found".

- Instale o **Node.js LTS** (22.12 ou mais novo) de <https://nodejs.org/pt>.
- No Windows, instale também o **Git para Windows**: <https://git-scm.com/downloads/win>.
- **Feche e abra o terminal de novo** depois de instalar.
- No Windows, trabalhe numa pasta como `C:\workshop` (fora do OneDrive) e use o **Prompt de Comando** (`cmd`).

O passo a passo completo está na seção "Preparar o computador" do `README.md`. Mais erros de Windows: seção [Se você usa Windows](#se-você-usa-windows).

## Passo 0 - Se você nem conseguiu pegar o projeto

Cole este prompt no Claude ou Codex:

```text
Clone a branch alunos deste repositório (a branch principal NÃO é a dos alunos):
git clone -b alunos https://github.com/ASP-J/workshop-ai.git

Depois leia o README.md.
Me explique, em linguagem simples:
1. o que é este projeto
2. quais arquivos eu preciso conhecer
3. qual é o primeiro passo
4. o que eu devo conferir no navegador

Antes de alterar qualquer coisa, explique o plano.
Depois de alterar, diga quais arquivos mudaram e como eu confiro se funcionou.
```

(Só se o instrutor pediu SSH: troque a linha do clone por `git clone -b alunos git@github.com:ASP-J/workshop-ai.git`.)

## Passo 1 - Se você não sabe o que o projeto faz

Cole este prompt:

```text
Estou no projeto do desafio Painel de capacitação com API Twygo + CSV.
Leia o README.md e o DESAFIO.md.

Me explique em linguagem simples:
1. qual é o objetivo do desafio
2. o que significa API da Twygo
3. o que significa CSV
4. por que o cruzamento é feito por e-mail
5. o que eu preciso mostrar no final

Não altere arquivos ainda.
Só me explique.
```

Você entendeu o passo se conseguir repetir esta frase:

```text
O sistema busca usuários na Twygo, recebe uma planilha CSV, cruza tudo pelo e-mail e mostra tabela, cards e gráficos.
```

## Passo 2 - Se você não sabe preparar o projeto

Cole este prompt:

```text
Prepare este projeto para rodar localmente.

Faça tudo que for necessário para o projeto abrir no navegador.
Explique cada passo em linguagem simples.

Antes de alterar arquivos, me diga o plano.
Depois de alterar, me diga:
1. quais arquivos mudaram
2. o que foi instalado ou configurado
3. qual URL devo abrir no navegador
4. como eu confiro se funcionou
```

O resultado esperado é a IA dizer que o projeto abre em:

```text
http://localhost:5183
```

(A tela usa a porta 5183 e o backend local usa a porta 5184.)

Se aparecer erro de versão do Node: o projeto precisa do Node.js 22.12 ou mais novo. Instale a versão **LTS** de <https://nodejs.org/pt> (Mac e Windows), feche e abra o terminal de novo e peça para a IA conferir com `node -v`.

## Passo 3 - Se você recebeu o token mas não sabe onde colocar

O token vai **direto no arquivo `.env`**, nunca no chat.

1. Cole este prompt:

   ```text
   Crie o .env a partir do .env.example e abra o arquivo para eu colar o token (não peça nem mostre o token no chat)
   ```

2. A IA abre o arquivo num editor de texto:
   - no Mac: `cp .env.example .env` e `open -e .env`
   - no Windows: `copy .env.example .env` e `notepad .env`
3. Procure a linha `TWYGO_API_TOKEN=` e cole o token logo depois do `=` (substituindo o texto de exemplo), sem espaços.
4. Salve (Cmd+S no Mac, Ctrl+S no Windows) e feche o editor.
5. Volte para a IA e escreva `pronto`.

Se o editor não abriu, mande:

```text
O editor não abriu. Me diga, passo a passo, como abrir o arquivo .env da pasta do projeto
num editor de texto para eu colar o token. Não peça nem mostre o token no chat.
```

Importante:

- use somente o token do workshop (ele será revogado depois); nunca um token pessoal
- não cole o token no chat da IA
- não tire print com o token aparecendo
- não mande o token em grupo
- não cole o token em arquivo público
- se a IA pedir ou repetir seu token, não responda com ele e avise o instrutor

## Passo 4 - Se a tela não abriu

Cole este prompt:

```text
A tela do projeto não abriu no navegador.

Confira o que aconteceu.
Explique em linguagem simples:
1. se o frontend está rodando (porta 5183)
2. se o backend está rodando (porta 5184)
3. qual URL eu devo abrir
4. se existe algum erro no terminal

Se precisar corrigir, corrija.
Depois me diga exatamente como eu confiro se a tela abriu.
```

O resultado esperado é conseguir abrir:

```text
http://localhost:5183
```

## Passo 5 - Se a API da Twygo não respondeu

Sinais: o selo no topo mostra "Verificar API" ou o card "Usuários na tela" fica em 0.

Cole este prompt:

```text
A API da Twygo não respondeu ou os usuários não apareceram.

Verifique:
1. se o arquivo .env existe
2. se TWYGO_API_TOKEN está preenchido (só diga sim ou não, não mostre o valor)
3. se o backend está lendo o token
4. se a chamada para a API da Twygo usa Authorization: Bearer
5. se apareceu erro 401, 403, 404 ou 500

Não peça, não mostre e não imprima meu token.
Explique a causa provável em linguagem simples.
Se puder corrigir, corrija.
Depois me diga como eu confiro se os usuários carregaram.
```

Se o problema for o token, refaça o Passo 3 (a IA abre o `.env` e você cola o token de novo).

Como entender os erros:

- `401`: normalmente token ausente, errado ou vencido
- `403`: token sem permissão
- `404`: endereço da API errado
- `500`: erro no servidor ou na chamada (por exemplo, `.env` sem o token)

## Passo 6 - Se você não sabe anexar o CSV

O arquivo de exemplo fica aqui:

```text
public/capacitacao_workshop.csv
```

O jeito mais simples: clique em **Usar CSV exemplo** na tela. Ou clique em **Anexar CSV** e escolha o arquivo.

Se precisar de ajuda, cole este prompt:

```text
Me explique como anexar o CSV no painel.
O arquivo está em public/capacitacao_workshop.csv.

Explique:
1. onde fica o botão ou área de upload
2. o que deve acontecer depois que eu anexar
3. quais colunas o CSV precisa ter
4. como eu confiro se o CSV foi lido
```

O CSV tem estas colunas:

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
```

Depois de anexar, deve aparecer: `capacitacao_workshop.csv · 287 linhas lidas da planilha`.

## Passo 7 - Se o CSV anexou mas não cruzou os dados

Cole este prompt:

```text
O CSV foi anexado, mas os dados não parecem cruzados com os usuários da Twygo.

Confira se o cruzamento está sendo feito pelo campo email.
Explique em linguagem simples:
1. o que significa cruzar dados
2. de onde vem o e-mail da Twygo
3. de onde vem o e-mail do CSV
4. o que acontece quando os e-mails são iguais
5. o que acontece quando os e-mails não batem

Me diga só contagens, sem mostrar nomes nem e-mails.
Se a regra estiver errada, corrija.
Depois me diga como conferir na tabela.
```

Exemplo simples:

```text
Twygo: ana@empresa.com
CSV: ana@empresa.com
Resultado: Ana aparece com os dados de capacitação.
```

## Passo 8 - Se os números não batem

Os números esperados (com o token do workshop e o `capacitacao_workshop.csv`) são:

- Usuários na tela: **186**
- CSV: **287** linhas lidas da planilha, de **160** e-mails diferentes
- E-mails cruzados: **150** (271 linhas); **10** e-mails `@anonimizado.com` não cruzam, de propósito, porque não existem na plataforma
- Usuários sem capacitação no CSV: **36**
- Cards: Concluíram **96** · Não concluíram **54** · Horas totais **2020h** · Cobertura **81%** · Taxa de conclusão **64%** · Horas por pessoa **13.47h** · Nota média **7.89** · Setores **34**

Lembre: os cards contam **pessoas**; a barra do upload conta **linhas** (uma linha é um curso de uma pessoa).

Se aparecerem só **50** usuários ou só **50** e-mails cruzados, o painel está olhando só a primeira página da API. Cole este prompt:

```text
O painel mostra só 50 usuários (ou só 50 e-mails cruzados), mas a Twygo tem 186.
A API é paginada (per_page até 100, pagination.total_pages e total_entries).
Confira se a tela está chamando /api/users?all=true e se o backend busca todas as páginas.
Não mostre o token, nomes nem e-mails; só contagens.
Explique em linguagem simples e corrija.
```

## Passo 9 - Se os cards ou gráficos não aparecem

Cole este prompt:

```text
Os cards ou gráficos não apareceram corretamente.

Confira se o painel mostra:
1. total de usuários
2. quem concluiu e quem não concluiu
3. total de horas de capacitação
4. cobertura e taxa de conclusão
5. gráficos por setor e por área
6. gráfico por categoria e "Concluiu x não concluiu"

Explique o que cada indicador significa.
O painel já vem com esses itens: se algo não aparecer, explique o motivo e corrija.
Depois me diga como conferir na tela.
```

Lembre: antes de anexar o CSV, os gráficos mostram "Anexe o CSV para gerar este gráfico." Isso é normal.

## Passo 10 - Se a IA ficou técnica demais

Cole este prompt:

```text
Não entendi sua explicação.
Explique de novo como se eu nunca tivesse programado.

Use este formato:
1. o que aconteceu
2. por que aconteceu
3. o que você fez
4. como eu confiro
5. qual é o próximo passo

Use exemplos deste projeto.
```

## Passo 11 - Se você se perdeu no meio da aula

Cole este prompt:

```text
Eu me perdi no meio do desafio.

Resume tudo que já foi feito até agora.
Organize assim:
1. o que já está funcionando
2. o que ainda falta fazer
3. quais arquivos foram alterados
4. o que eu devo conferir no navegador
5. qual é o próximo passo mais simples

Explique em linguagem simples.
```

## Passo 12 - Se você quer validar a entrega final

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
7. se os cards aparecem com os números esperados
8. se os gráficos aparecem
9. se o token está protegido no .env
10. se o token não aparece na tela, no chat nem no README

Não mostre o token, nomes nem e-mails; só contagens.
Se algo estiver errado, explique e corrija.
Depois gere um resumo simples para eu apresentar para o instrutor.
```

## Se você usa Windows

Erros que só aparecem no Windows e como resolver:

| O que apareceu | O que fazer |
|---|---|
| `'node' não é reconhecido como um comando interno` (ou `npm`, `git`, `claude`) | Instale o que falta (Node.js **LTS** de <https://nodejs.org/pt>, Git de <https://git-scm.com/downloads/win>). Depois **feche e abra o terminal de novo**. Se continuar, reinicie o computador |
| PowerShell: `npm.ps1 não pode ser carregado porque a execução de scripts foi desabilitada neste sistema` | Use o **Prompt de Comando**: tecla Windows, digite `cmd`, Enter. Ou rode `npm.cmd` no lugar de `npm`. Para liberar de vez só para o seu usuário, no PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` e responda `S` |
| PowerShell: `O token '&&' não é um separador de instrução válido` | Digite os comandos um por linha, ou use o Prompt de Comando |
| `Port 5183 is already in use` ou `EADDRINUSE` na 5184 | Já tem outro `npm run dev` aberto (outra janela de terminal?). Feche-o com Ctrl + C. Para descobrir quem usa a porta: `netstat -ano \| findstr :5183` (o último número é o PID) e `taskkill /PID <número> /F` |
| `npm install` demora muito, ou dá `EPERM` / `EBUSY` | A pasta está no **OneDrive** ou o antivírus está vigiando. Mova o projeto para `C:\workshop` e rode `npm install` de novo |
| `'cp' não é reconhecido` ou `'open' não é reconhecido` | São comandos do Mac. No Windows: `copy .env.example .env` e `notepad .env` |

Se preferir, cole na IA:

```text
Estou no Windows e deu este erro:
[cole o erro, sem o token]
Use comandos do Windows (Prompt de Comando), explique em linguagem simples e corrija.
```

## Checklist visual

Antes de chamar o instrutor, confira:

- a tela abriu no navegador (http://localhost:5183)
- aparece "API conectada" e 186 usuários
- o CSV foi anexado (287 linhas lidas da planilha)
- a tabela tem usuários e dados de capacitação
- os cards mostram os números esperados
- existe pelo menos um gráfico
- o token não aparece na tela nem no chat
- você consegue explicar o que é API
- você consegue explicar o que é CSV
- você consegue explicar que o cruzamento é pelo e-mail

## Frase para apresentar no final

Use esta frase:

```text
Eu usei Claude ou Codex para rodar, entender e evoluir um painel local que busca usuários na API da Twygo, recebe um CSV de capacitação, cruza os dados pelo e-mail e mostra os resultados em tabela, cards e gráficos.
```

Se perguntarem por que tem backend:

```text
Porque o backend protege o token da API. A tela chama o backend, e o backend chama a Twygo.
```

Se perguntarem o que você aprendeu:

```text
Aprendi que a IA ajuda muito, mas eu preciso saber pedir, conferir e entender o fluxo dos dados.
```

## Se nada funcionar

Cole este prompt:

```text
Nada está funcionando e eu preciso de um diagnóstico simples.

Não altere tudo de uma vez.
Primeiro investigue e me diga:
1. qual é o problema mais provável
2. qual arquivo ou configuração pode estar envolvido
3. qual teste simples podemos fazer agora
4. o que você recomenda tentar primeiro

Não peça nem mostre o token.
Depois espere minha confirmação antes de fazer uma mudança grande.
```

Depois chame o instrutor com:

```text
Eu travei nesta etapa:
[diga a etapa]

O erro que apareceu foi:
[cole o erro, sem o token]

Eu já tentei:
[diga o que você tentou]

A IA acha que o problema pode ser:
[cole o resumo da IA]
```
