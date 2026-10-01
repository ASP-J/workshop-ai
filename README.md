# Workshop AI - Painel de Capacitação Twygo

Esta é a **versão dos alunos** do repositório.

Se você está vendo esta página no GitHub, confira se a branch selecionada é:

```text
alunos
```

Se você estiver usando Claude ou Codex, comece pedindo para a IA pegar a versão dos alunos:

```text
Clone a branch alunos deste repositório (a branch principal NÃO é a dos alunos):
git clone -b alunos https://github.com/ASP-J/workshop-ai.git

Depois leia o README.md e me guie passo a passo, em linguagem simples.
Antes de fazer qualquer alteração, explique o que você vai fazer e por quê.
Depois de cada alteração, explique o que mudou, quais arquivos foram alterados e como eu confiro se funcionou.
```

(Se o instrutor pedir para usar SSH, veja a nota no final deste README.)

Este repositório é o ponto de partida do desafio.

O painel que conecta a API da Twygo com uma planilha CSV de capacitação **já vem pronto** nesta branch.

Seu desafio é usar Claude ou Codex para **rodar, entender, conferir e evoluir** esse painel.

O objetivo não é decorar código.

O objetivo é aprender este fluxo:

```text
prompt para a IA -> a IA roda/explica/ajusta o projeto -> você confere no navegador -> você pede ajustes
```

## Regras de ouro (segurança e dados)

- **Tudo roda local.** O painel abre só no seu computador (`localhost` / `127.0.0.1`). Ele não fica visível para outras pessoas da rede/Wi-Fi.
- **Nada sobe para servidor ou nuvem.** Não publique o painel em nenhum servidor, hospedagem ou serviço online.
- **Repositório privado.** Se for guardar seu projeto no GitHub, use um repositório **privado**.
- **Auditoria antes de publicar.** Antes de publicar ou compartilhar qualquer coisa, peça uma revisão para o João, a Adriana ou um dev.
- **Use só o token do workshop.** Use o token entregue pelo instrutor (ele será revogado depois). Nunca use um token pessoal.
- **O token nunca vai para o chat da IA.** Você cola o token direto no arquivo `.env`, que a IA abre para você (veja o Passo 2).
- **Nada de token ou dados reais em print.** Não cole token, nomes ou e-mails reais em prints, slides ou grupos.
- **O servidor local filtra os dados.** A API da Twygo devolve telefone, endereço, CEP e documentos, mas o servidor local repassa para a tela só o que o painel usa: código, nome, e-mail, setor e situação.

## Regra de ouro para usar a IA

Sempre peça para Claude ou Codex explicar o que está fazendo.

Use esta regra em todos os prompts:

```text
Explique cada passo em linguagem simples.
Antes de alterar arquivos, diga o que você pretende fazer.
Depois de alterar, diga:
1. o que mudou
2. por que mudou
3. quais arquivos foram alterados
4. como eu confiro se funcionou
5. qual é o próximo passo
Não esconda a explicação atrás de termos técnicos.
```

Se a IA responder de forma muito técnica, mande:

```text
Explica de novo como se eu nunca tivesse programado.
Use exemplos deste projeto.
```

Se a IA fizer muitas coisas de uma vez e você se perder, mande:

```text
Para um pouco.
Resume o que você já fez, em ordem.
Depois me diga exatamente o que eu devo conferir agora.
```

## O que o painel já faz (e você vai conferir e evoluir)

Um painel local chamado:

```text
Painel de capacitação
```

Ele já faz isto:

1. Busca **todos** os usuários na API da Twygo (todas as páginas).
2. Recebe um CSV de capacitação.
3. Cruza usuários + CSV pelo `email`.
4. Mostra uma tabela com os dados cruzados.
5. Mostra cards de resumo.
6. Mostra gráficos por setor, área, categoria e "Concluiu x não concluiu".
7. Protege o token da API usando `.env`.

## O que significa conectar na API da Twygo

Quando o desafio falar em **conectar**, **ligar** ou **chamar** a API da Twygo, significa:

```text
usar o token entregue pelo instrutor para buscar usuários reais da plataforma Twygo
```

Você não precisa saber todos os detalhes técnicos da API.

O que você precisa entender é:

1. A Twygo guarda os usuários.
2. A API é o caminho para buscar esses usuários.
3. O token é a chave que autoriza essa busca.
4. O backend local usa esse token para falar com a Twygo.
5. A tela mostra os usuários que vieram dessa busca.

## A API da Twygo é paginada (por que isso importa)

A API não devolve todos os usuários de uma vez. Ela entrega **páginas**, como um livro:

- cada página traz no máximo **100 usuários** (`per_page` vai até 100);
- a resposta informa quantas páginas existem (`pagination.total_pages`) e quantos usuários existem no total (`pagination.total_entries`).

Exemplo real do workshop: buscar só `page=1&per_page=50` traz **50 dos 186 usuários**. Se o painel cruzasse só essa primeira página, apenas 50 e-mails da planilha encontrariam alguém.

Por isso o projeto **busca todas as páginas** (o painel chama `/api/users?all=true`, e o backend local vai pedindo página 1, 2, 3... até a última) e só depois cruza com o CSV.

## Materiais da aula

Leia nesta ordem:

1. `PASSO_A_PASSO_COMPLETO.md`
   - Roteiro completo do projeto, do início até a apresentação final.
   - Siga este documento como trilha principal da aula.

2. `DESAFIO.md`
   - Enunciado do desafio.
   - Explica o que você precisa entregar.

3. `APOSTILA_CONCEITOS.md`
   - Explica conceitos como API, frontend, backend, CSV, token e `.env`.
   - Leia se alguma palavra parecer confusa.

4. `PASSO_A_PASSO_SE_TRAVAR.md`
   - Roteiro de emergência.
   - Use se você não conseguir continuar ou não entender um erro.

5. `public/capacitacao_workshop.csv`
   - CSV de exemplo para anexar no painel (ou use o botão "Usar CSV exemplo").

6. `docs/APOSTILA_CONCEITOS.pdf` e `docs/APOSTILA_RESUMO.png`
   - Versão em PDF da apostila e um resumo visual de uma página.
   - Veja: [Apostila em PDF](docs/APOSTILA_CONCEITOS.pdf) · [Resumo visual](docs/APOSTILA_RESUMO.png)

## Passo 0 - Antes do projeto: a rodada "pergunte ao Claude"

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

## Passo 1 - Peça para a IA entender o projeto

Abra Claude ou Codex e envie:

```text
Estou no desafio do Painel de capacitação com API Twygo + CSV.
Leia os arquivos do projeto e me explique, em linguagem simples, o que já existe.
Depois me diga qual deve ser meu primeiro passo.
Não use explicação técnica demais.
Para cada arquivo importante, explique:
- para que ele serve
- se o aluno precisa mexer nele ou só entender
- como ele participa do desafio
```

Confira se a IA mencionou:

- API da Twygo
- CSV de capacitação
- cruzamento por e-mail
- frontend
- backend
- `.env`

## Passo 2 - Peça para preparar o projeto e configurar o token

Envie:

```text
Prepare este projeto para rodar localmente.
Instale as dependências necessárias.
Explique o que é dependência, o que é .env e por que o token precisa ficar protegido.
Depois diga quais arquivos você alterou ou criou.
```

Agora o token. **Você nunca cola o token no chat da IA.** O fluxo é sempre este:

1. Envie para a IA:

   ```text
   Crie o .env a partir do .env.example e abra o arquivo para eu colar o token (não peça nem mostre o token no chat)
   ```

2. A IA cria o arquivo e abre ele num editor de texto:
   - no Mac: `open -e .env`
   - no Windows: `notepad .env`
3. No editor, cole o token recebido do instrutor logo depois de `TWYGO_API_TOKEN=` (substituindo o texto de exemplo), sem espaços. Fica assim: `TWYGO_API_TOKEN=seu_token_aqui`.
4. Salve o arquivo (Cmd+S no Mac, Ctrl+S no Windows) e feche o editor.
5. Volte para a IA e escreva:

   ```text
   pronto
   ```

Sobre o token:

- use **somente o token do workshop** entregue pelo instrutor (ele será revogado depois da aula)
- **nunca** use um token pessoal ou de produção seu

Atenção:

- não cole o token no chat da IA
- não cole o token no README
- não cole o token no frontend
- não publique o token no GitHub
- não mande print com token aparecendo
- se a IA pedir ou mostrar o token, não responda com ele e avise o instrutor

## Passo 3 - Peça para abrir o projeto local

Depois que você disser "pronto", envie:

```text
Abra o projeto local.
Confira se o frontend abriu no navegador.
Confira se o backend está respondendo.
Confira se a API da Twygo respondeu.
Se der erro, explique em linguagem simples e corrija.
Explique também:
- o que é frontend
- o que é backend
- o que significa a API da Twygo responder
- qual URL eu devo abrir no navegador
```

O navegador deve abrir em:

```text
http://localhost:5183
```

(A tela fica na porta 5183. O backend local, que guarda o token, fica na porta 5184.)

## Passo 4 - Confira se os usuários carregaram

Na tela, procure o selo **API conectada** no topo e o card **Usuários na tela** com **186**.

Se não aparecer nada, envie:

```text
Os usuários da Twygo não apareceram na tela.
Verifique a chamada da API, o backend local e se o .env tem o TWYGO_API_TOKEN preenchido.
Explique o problema em linguagem simples e corrija.
Não peça, não mostre e não imprima meu token.
Antes de corrigir, me diga quais são as 3 causas mais prováveis.
Depois de corrigir, me diga como conferir se os usuários carregaram.
```

## Passo 5 - Anexe o CSV

Use o arquivo:

```text
public/capacitacao_workshop.csv
```

Na tela do painel, clique em **Anexar CSV** e escolha esse arquivo, ou clique em **Usar CSV exemplo** (carrega o mesmo arquivo).

O CSV tem estas colunas:

- `email`
- `area`
- `categoria`
- `curso`
- `horas_capacitacao`
- `status_capacitacao`
- `nota`
- `concluido_em`

Depois de anexar, deve aparecer: `capacitacao_workshop.csv · 287 linhas lidas da planilha`.

## Passo 6 - Confira o cruzamento por e-mail

O sistema junta:

```text
usuários da API + linhas do CSV
```

usando:

```text
email
```

Se a tabela não cruzar os dados, envie:

```text
O CSV foi anexado, mas os dados não parecem cruzados com os usuários.
Confira se o cruzamento está sendo feito pelo campo email.
Mostre uma explicação simples do problema e corrija.
Explique o que significa cruzar dados.
Mostre um exemplo simples usando um e-mail fictício.
Depois diga onde no projeto essa regra está.
```

## Passo 7 - Confira cards e gráficos

O painel já vem com:

- cards de resumo
- tabela de usuários
- dados de capacitação
- gráficos de pizza (donut)
- gráficos de barras

Peça para a IA explicar o que você está vendo:

```text
Confira se o painel tem cards, tabela e gráficos.
Explique o que cada card e cada gráfico significa, em linguagem simples.
Use os dados cruzados de capacitação (setor, área, categoria e "Concluiu x não concluiu").
Se algo estiver quebrado ou vazio, explique o motivo antes de corrigir.
```

Compare com os números da seção **Como saber se deu certo** logo abaixo.

Quer evoluir o painel? (opcional)

```text
Sugira 3 melhorias simples para este painel, pensando em uma pessoa de RH.
Antes de mexer, explique cada uma e me deixe escolher.
Não mude a regra de cruzamento por e-mail.
Depois de mexer, explique como eu confiro na tela.
```

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

**Por que 10 e-mails nunca cruzam?** O CSV tem, de propósito, 10 e-mails com domínio `@anonimizado.com` que **não existem na plataforma** (simulam pessoas que estão na planilha, mas não estão na Twygo, por exemplo quem saiu da empresa). Como não há e-mail igual na Twygo, não existe com quem cruzar e essas 16 linhas ficam de fora. Isso mostra que o cruzamento só funciona quando o e-mail existe dos dois lados. (Alguns usuários da própria plataforma também têm e-mail `@anonimizado.com`; esses cruzam normalmente.)

**Se aparecer só 50 cruzados**, o painel está olhando só a primeira página da API (`page=1&per_page=50`). O certo é buscar todas as páginas (veja "A API da Twygo é paginada").

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
- se os gráficos aparecem
- se o token está protegido no .env
- se os números batem com a seção "Como saber se deu certo" do README

Se algo estiver errado, corrija.
Depois me explique o resultado em linguagem simples.
No final, gere um resumo em 5 frases para eu conseguir apresentar o projeto para outra pessoa.
```

## Se der erro

Não escreva apenas:

```text
não funcionou
```

Escreva assim:

```text
Deu este erro no desafio:
[cole o erro completo aqui, sem o token]

Eu esperava que:
[explique o que você esperava]

Me explique o motivo em linguagem simples e corrija.
Antes de corrigir, me diga:
1. qual parte provavelmente quebrou
2. por que isso pode ter acontecido
3. o que você vai tentar primeiro

Depois de corrigir, me diga como eu confiro que resolveu.
```

O projeto precisa do Node.js 22 ou mais novo. Se aparecer erro de versão do Node, peça para a IA verificar e instalar uma versão compatível.

## Prompt para pedir explicação de qualquer coisa

Use este prompt sempre que alguma parte parecer confusa:

```text
Não entendi essa parte.
Explique com calma, em linguagem simples.
Use o exemplo deste projeto.
Me diga:
1. o que isso é
2. para que serve
3. onde aparece no projeto
4. o que acontece se estiver errado
5. como eu confiro se está funcionando
```

## Prompt para pedir resumo do que já foi feito

Use quando você sentir que se perdeu:

```text
Resume o que já foi feito até agora no projeto.
Organize em ordem:
1. o que foi configurado
2. o que foi conferido
3. quais arquivos mudaram
4. o que já está funcionando
5. o que ainda falta fazer
Explique como se eu estivesse acompanhando uma aula.
```

## Prompt para pedir explicação dos arquivos alterados

Use depois que a IA mexer no projeto:

```text
Liste os arquivos que você alterou.
Para cada arquivo, explique:
1. por que ele foi alterado
2. o que ele faz no projeto
3. qual parte do desafio depende dele
4. como eu posso conferir se a alteração funcionou
Não use linguagem técnica demais.
```

## Checklist antes de chamar o instrutor

Confira:

- pedi para a IA preparar o projeto
- a IA abriu o `.env` e eu colei o token lá (não no chat)
- salvei o `.env` e disse "pronto" para a IA
- a tela abriu no navegador
- apareceu "API conectada" e 186 usuários
- anexei o CSV (287 linhas lidas da planilha)
- a tabela apareceu
- os cards apareceram com os números esperados
- os gráficos apareceram
- o token não apareceu na tela nem no chat
- consigo explicar o fluxo do projeto

## Como explicar no final

Use esta frase:

```text
Eu rodei, entendi e evoluí um painel local que busca usuários na API da Twygo, recebe um CSV de capacitação, cruza os dados pelo e-mail e mostra indicadores em cards, tabela e gráficos.
```

Se perguntarem por que existe backend:

```text
Porque o backend protege o token. A tela chama o backend, e o backend chama a API da Twygo.
```

Se perguntarem por que usamos CSV:

```text
Porque o CSV representa uma planilha externa de capacitação que precisa ser cruzada com os usuários da plataforma.
```

## Resumo do fluxo

```text
Twygo -> API (todas as páginas) -> backend -> frontend -> CSV -> cruzamento por e-mail -> cards e gráficos
```

Se você entendeu esse fluxo, você entendeu a parte mais importante do desafio.

## Nota opcional: clonar por SSH

Só use se o instrutor pedir e se você já tiver uma chave SSH configurada no GitHub. Troque a linha do clone por:

```text
git clone -b alunos git@github.com:ASP-J/workshop-ai.git
```
