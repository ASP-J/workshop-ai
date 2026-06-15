# Apostila de conceitos - Workshop AI + API Twygo + CSV

Esta apostila existe para explicar, em linguagem simples, o que cada coisa do projeto significa.

Ela nao foi escrita para formar programadores em um dia. Ela foi escrita para a pessoa conseguir acompanhar o desafio sem travar em palavras como `API`, `.env`, `frontend`, `backend`, `token`, `CSV` e `localhost`.

## Como vamos usar Claude ou Codex

Neste workshop, a pessoa nao precisa decorar comandos nem saber programar sozinha.

A regra da aula e:

```text
voce da prompts para o Claude/Codex -> a IA altera o projeto -> voce confere o resultado
```

Quando aparecer um comando nesta apostila, ele serve para entender o que acontece por baixo. Na pratica, o aluno pode pedir para a IA executar.

Exemplo:

```text
Execute as acoes necessarias para instalar as dependencias e abrir o projeto local.
Depois me diga qual endereco eu devo abrir no navegador.
```

Outro exemplo:

```text
Rode os testes do projeto e me explique o resultado em linguagem simples.
```

O aluno nao precisa saber de memoria o que e `npm install`, `npm run dev` ou `npx vite build`. Ele precisa saber pedir, conferir e explicar o que aconteceu.

## Como pedir explicacoes melhores para a IA

Nao use a IA apenas para fazer.

Use a IA para explicar.

Um bom pedido tem 5 partes:

1. O que voce quer fazer.
2. O contexto do projeto.
3. O nivel de explicacao esperado.
4. O que a IA deve alterar.
5. Como a IA deve mostrar que funcionou.

Exemplo:

```text
Quero entender como o projeto busca usuarios na Twygo.
Explique em linguagem simples.
Mostre quais arquivos participam disso.
Nao altere nada ainda.
No final, me diga como eu confiro se essa busca esta funcionando.
```

Antes de deixar a IA alterar arquivos, voce pode pedir:

```text
Antes de alterar qualquer arquivo, explique seu plano.
Diga o que voce pretende fazer, por que isso e necessario e quais arquivos podem mudar.
Use linguagem simples.
```

Depois que a IA alterar arquivos, peca:

```text
Agora explique o que voce mudou.
Liste os arquivos alterados.
Para cada arquivo, diga o que mudou, por que mudou e como eu confiro se funcionou.
```

Se a resposta vier tecnica demais, peca:

```text
Explica de novo como se eu nunca tivesse programado.
Use uma comparacao simples e um exemplo deste projeto.
```

Se voce se perder no meio da aula, peca:

```text
Resume tudo que ja fizemos ate agora.
Separe em:
1. o que ja esta funcionando
2. o que ainda falta
3. qual deve ser o proximo passo
```

## Mapa mental do projeto

O sistema do workshop faz isto:

```text
API da Twygo -> backend local -> frontend -> upload do CSV -> cruzamento dos dados -> graficos
```

Em portugues bem direto:

1. A Twygo tem usuarios cadastrados.
2. A API da Twygo entrega esses usuarios.
3. Nosso backend local busca esses usuarios com seguranca.
4. Nosso frontend mostra os usuarios na tela.
5. O aluno anexa um CSV de capacitacao.
6. O sistema cruza API + CSV pelo email.
7. A tela mostra tabela, resumo e graficos.

## 1. O que e um sistema local

Um sistema local e um sistema que roda no seu proprio computador.

Neste projeto, ele abre no navegador em:

```text
http://localhost:5183
```

`localhost` significa:

```text
este computador aqui
```

Ou seja, nao e um site publico na internet. E uma tela rodando na maquina da pessoa.

### Exemplo no workshop

Quando voce pede para o Claude/Codex abrir o projeto local, a IA liga duas partes no computador:

- a tela do sistema
- o servidor local

## 2. O que e frontend

Frontend e a parte visual do sistema.

E tudo aquilo que a pessoa ve e usa no navegador:

- botoes
- textos
- tabelas
- campos de upload
- cards
- graficos
- mensagens de erro

### Exemplo no workshop

Quando o aluno abre:

```text
http://localhost:5183
```

ele esta vendo o frontend.

Neste projeto, o frontend foi feito com:

```text
React + Vite
```

### Traducao simples

Frontend e a vitrine do sistema.

Ele mostra as informacoes e recebe as acoes da pessoa.

## 3. O que e React

React e uma ferramenta para criar telas.

Em vez de montar uma pagina inteira manualmente, usamos componentes.

Um componente e um pedaco reutilizavel da tela.

Exemplos de componentes:

- um card de resumo
- uma tabela
- um grafico
- uma mensagem de erro
- um botao

### Exemplo no workshop

O painel de capacitacao e uma tela React.

Ele mostra:

- usuarios vindos da Twygo
- dados vindos do CSV
- cruzamento entre usuarios e capacitacoes
- graficos por area, categoria e status

## 4. O que e Vite

Vite e uma ferramenta que ajuda a rodar o frontend.

Ele faz o React abrir rapido no navegador durante o desenvolvimento.

### Exemplo no workshop

Quando a IA liga o frontend, o Vite abre a tela em:

```text
http://localhost:5183
```

### Traducao simples

Vite e o motor que liga a tela durante a aula.

## 5. O que e backend

Backend e a parte do sistema que fica por tras da tela.

Ele nao e feito para o usuario final clicar. Ele e feito para processar dados, proteger informacoes e conversar com outros sistemas.

Neste projeto, o backend faz uma coisa muito importante:

```text
buscar usuarios na API da Twygo sem colocar o token dentro da tela
```

### Exemplo no workshop

O backend roda em:

```text
http://localhost:5184
```

Ele tem uma rota:

```text
GET /api/users
```

Quando o frontend chama essa rota, o backend busca os usuarios na Twygo.

### Traducao simples

Backend e a cozinha do restaurante.

O usuario ve o prato na mesa, mas nao ve a cozinha trabalhando.

## 6. O que e Node.js

Node.js permite rodar JavaScript fora do navegador.

Normalmente, JavaScript roda dentro da pagina. Com Node.js, conseguimos usar JavaScript tambem no servidor.

### Exemplo no workshop

O backend local foi feito com:

```text
Node.js + Express
```

Isso permite criar rotas como:

```text
/health
/api/users
```

## 7. O que e Express

Express e uma ferramenta para criar backend com Node.js.

Ele ajuda a criar rotas.

Uma rota e um endereco que responde alguma coisa.

### Exemplo no workshop

Rota para testar se o servidor esta vivo:

```text
GET /health
```

Resposta esperada:

```json
{"ok":true}
```

Rota para buscar usuarios:

```text
GET /api/users
```

Resposta esperada:

```text
lista de usuarios da Twygo
```

## 8. O que e API

API e uma forma de um sistema conversar com outro sistema.

Uma pessoa usa tela.

Um sistema usa API.

### Exemplo simples

Quando voce entra em um aplicativo de clima, ele provavelmente conversa com uma API para buscar a temperatura.

No nosso caso, o sistema conversa com a API da Twygo para buscar usuarios.

### Exemplo no workshop

O backend local chama:

```text
https://api.twygo.com/api/v2/users
```

Essa API devolve usuarios cadastrados na plataforma.

## 9. O que e endpoint

Endpoint e um endereco especifico dentro de uma API.

Pense na API como um predio.

O endpoint e uma sala dentro desse predio.

### Exemplo no workshop

API base:

```text
https://api.twygo.com
```

Endpoint de usuarios:

```text
/api/v2/users
```

Endereco completo:

```text
https://api.twygo.com/api/v2/users
```

## 10. O que e metodo HTTP

Metodo HTTP e o tipo de acao que voce quer fazer em uma API.

Os mais comuns sao:

- `GET`: buscar dados
- `POST`: criar dados
- `PUT`: atualizar dados
- `DELETE`: apagar dados

### No workshop

Usamos principalmente:

```text
GET
```

Porque queremos buscar usuarios.

Nao queremos criar, editar ou apagar usuarios da Twygo durante a aula.

## 11. O que e JSON

JSON e um formato de dados muito usado em APIs.

Ele parece um objeto com chaves e valores.

### Exemplo

```json
{
  "name": "Ana Silva",
  "email": "ana@empresa.com",
  "area": "Marketing"
}
```

### Traducao simples

JSON e uma forma organizada de enviar informacoes entre sistemas.

## 12. O que e CSV

CSV e uma planilha em formato simples.

Cada linha representa um registro.

Cada coluna e separada por virgula.

### Exemplo

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
ana@empresa.com,Marketing,Produto,Curso de onboarding,6,Concluido,9.1,2026-05-10
```

### No workshop

O CSV contem dados de capacitacao.

Ele e cruzado com os usuarios da Twygo usando o email.

## 13. O que e cruzamento de dados

Cruzamento de dados e juntar duas listas usando uma informacao em comum.

Neste projeto, a informacao em comum e:

```text
email
```

### Exemplo

API da Twygo:

```text
ana@empresa.com - Ana Silva
```

CSV:

```text
ana@empresa.com - 6 horas de capacitacao
```

Resultado cruzado:

```text
Ana Silva - Marketing - 6 horas de capacitacao
```

## 14. O que e .env

`.env` e um arquivo de configuracao local.

Ele guarda informacoes que mudam de pessoa para pessoa ou que nao devem ficar publicas.

Exemplos:

- token da API
- endereco base da API
- porta do servidor

### Exemplo no projeto

Arquivo:

```text
.env
```

Conteudo:

```text
TWYGO_API_TOKEN=cole_o_bearer_token_aqui
TWYGO_API_BASE_URL=https://api.twygo.com
PORT=5184
```

### Por que isso e importante

O token e uma chave de acesso.

Ele nao deve ficar escrito dentro do codigo da tela.

Ele tambem nao deve ser publicado no GitHub.

## 15. O que e .env.example

`.env.example` e um modelo do arquivo `.env`.

Ele mostra quais variaveis precisam existir, mas sem colocar o token real.

### Exemplo

```text
TWYGO_API_TOKEN=cole_o_bearer_token_aqui
TWYGO_API_BASE_URL=https://api.twygo.com
PORT=5184
```

### Como usar com Claude ou Codex

O aluno pode pedir:

```text
Crie meu arquivo .env a partir do .env.example.
Configure o arquivo .env com este token:
[cole aqui o token recebido do instrutor]

Salve esse valor na variavel TWYGO_API_TOKEN.
Nao mostre, nao repita e nao imprima meu token na resposta.
```

Assim o aluno nao precisa abrir o `.env` manualmente.

## 16. O que e token

Token e uma chave de acesso.

Ele serve para provar para a API que voce tem permissao para buscar dados.

### Exemplo simples

Pense no token como um cracha.

Sem cracha, voce nao entra.

Sem token, a API nao entrega os dados.

## 17. O que e Bearer token

Bearer token e um tipo comum de token usado em APIs.

Quando uma API pede Bearer token, normalmente o pedido vai assim:

```text
Authorization: Bearer seu_token_aqui
```

### No workshop

O aluno nao precisa escrever essa linha manualmente.

O backend monta isso usando o valor do `.env`.

## 18. O que e seguranca do token

O token deve ficar protegido.

Nao coloque token real em:

- print de tela
- WhatsApp aberto
- README publico
- codigo do frontend
- GitHub
- slide compartilhado publicamente

### Regra simples

Token real fica no `.env`.

Token de exemplo fica no `.env.example`.

## 19. O que e porta

Porta e como se fosse uma entrada especifica do computador.

O mesmo computador pode rodar varios sistemas ao mesmo tempo, cada um em uma porta diferente.

### No workshop

Frontend:

```text
http://localhost:5183
```

Backend:

```text
http://localhost:5184
```

## 20. O que e CORS

CORS e uma regra de seguranca do navegador.

Ela controla se uma tela pode conversar com outro endereco.

### Por que aparece no workshop

O frontend roda em:

```text
localhost:5183
```

O backend roda em:

```text
localhost:5184
```

Mesmo estando no mesmo computador, para o navegador sao enderecos diferentes.

Por isso o backend precisa permitir essa conversa.

## 21. O que e npm

`npm` e o gerenciador de pacotes do Node.js.

Ele instala ferramentas e bibliotecas usadas no projeto.

### Como pedir para a IA usar npm

Para instalar dependencias:

```text
Instale as dependencias do projeto.
```

Para abrir o projeto:

```text
Rode o projeto local e me diga o link que devo abrir no navegador.
```

Para rodar testes:

```text
Rode os testes e me explique se passou ou se falhou.
```

## 22. O que e package.json

`package.json` e a ficha tecnica do projeto.

Ele diz:

- nome do projeto
- scripts disponiveis
- bibliotecas usadas
- versao das dependencias

### Exemplo no workshop

Scripts importantes:

```json
{
  "dev": "concurrently \"npm:server\" \"npm:client\"",
  "client": "vite --host 0.0.0.0 --port 5183",
  "server": "node server/index.js",
  "test": "vitest run"
}
```

## 23. O que e node_modules

`node_modules` e a pasta onde ficam as dependencias instaladas pelo `npm install`.

Ela costuma ser grande.

Ela nao deve ser editada manualmente.

Ela tambem nao deve ser enviada para o GitHub.

### Regra simples

Se a pasta `node_modules` sumiu ou o projeto reclamar de dependencia, peca para a IA:

```text
Reinstale as dependencias do projeto e explique o que foi feito.
```

## 24. O que e Git

Git e uma ferramenta para guardar historico do projeto.

Ele registra mudancas em commits.

### Exemplo

Um commit e como uma foto do projeto naquele momento.

Voce pode ver:

- o que mudou
- quando mudou
- quem mudou
- qual mensagem explica a mudanca

## 25. O que e GitHub

GitHub e um lugar online para guardar repositorios Git.

Git e a ferramenta.

GitHub e o site onde o projeto fica hospedado.

### No workshop

O repositorio guarda:

- codigo do app
- desafio
- apostila
- CSV de exemplo
- instrucoes de uso

## 26. O que e branch

Branch e uma linha separada de trabalho dentro do Git.

### No workshop

Temos uma branch para os alunos:

```text
alunos
```

A ideia e deixar essa branch pronta para a turma usar sem baguncar a branch principal.

## 27. O que e commit

Commit e um pacote de alteracoes salvo no historico do Git.

### Exemplo de mensagem

```text
docs: add concepts booklet
```

Essa mensagem quer dizer:

```text
adicionei uma documentacao/apostila de conceitos
```

## 28. O que e erro 401

Erro `401` normalmente significa falta de autorizacao.

### No workshop

Se aparecer `401`, pode ser:

- token errado
- token vencido
- token nao foi colocado no `.env`
- backend nao conseguiu ler o `.env`

## 29. O que e erro 404

Erro `404` significa que o endereco nao foi encontrado.

### Exemplo

Se voce abrir:

```text
http://localhost:5184/usuarios
```

mas o projeto so tem:

```text
/api/users
```

pode dar `404`.

## 30. O que e erro 500

Erro `500` significa erro no servidor.

No workshop, pode acontecer se:

- a API externa falhar
- o backend quebrar
- alguma configuracao estiver errada

## 31. O que e loading

Loading e o estado de carregamento.

Ele aparece quando o sistema ainda esta buscando dados.

### Exemplo

Quando a tela abre, ela pode mostrar algo como:

```text
Carregando usuarios...
```

Isso evita que a pessoa ache que o sistema travou.

## 32. O que e estado vazio

Estado vazio e quando nao tem dados para mostrar.

### Exemplo

Se o aluno ainda nao anexou o CSV, a tela pode mostrar uma mensagem dizendo que precisa anexar a planilha.

Isso e melhor do que deixar a tela em branco.

## 33. O que e teste automatizado

Teste automatizado e um codigo que verifica se outra parte do sistema continua funcionando.

### Exemplo no workshop

Os testes podem conferir:

- se o CSV e lido corretamente
- se os usuarios sao cruzados pelo email
- se os calculos de horas estao certos
- se os dados dos graficos estao corretos

### Como pedir

```text
Rode os testes automatizados do projeto e me diga quantos passaram.
```

## 34. O que e build

Build e gerar a versao final do frontend.

Durante a aula usamos modo de desenvolvimento.

No build, o Vite prepara arquivos otimizados.

### Como pedir

```text
Gere o build do projeto e me diga se apareceu algum erro.
```

Se o build falha, pode existir algum erro que impediria o sistema de ir para producao.

## 35. Como os dados andam dentro do app

Fluxo completo:

```text
1. Aluno abre http://localhost:5183
2. Frontend carrega a tela
3. Frontend chama /api/users
4. Backend recebe esse pedido
5. Backend le o token do .env
6. Backend chama a API da Twygo
7. API da Twygo devolve usuarios
8. Backend devolve usuarios para o frontend
9. Aluno anexa o CSV
10. Frontend le o CSV
11. Frontend cruza CSV + usuarios pelo email
12. Frontend mostra tabela, cards e graficos
```

## 36. O que cada arquivo principal faz

`README.md`

Explica como usar o projeto.

`APOSTILA_CONCEITOS.md`

Explica os conceitos para quem nunca programou.

`.env.example`

Modelo das configuracoes necessarias.

`package.json`

Lista as acoes que a IA pode executar e as dependencias do projeto.

`server/index.js`

Liga o backend local.

`server/twygoApi.js`

Concentra a chamada para a API da Twygo.

`src/App.jsx`

Tela principal do frontend.

`src/trainingCsv.js`

Le e interpreta o CSV.

`src/trainingDashboard.js`

Cruza dados e calcula indicadores.

`public/sample-capacitacao.csv`

CSV de exemplo usado na aula.

## 37. Frases que ajudam a pedir ajuda para a IA

Quando der erro, nao mande apenas:

```text
nao funcionou
```

Mande assim:

```text
Estou usando o projeto do workshop com Claude/Codex.
Pedi para abrir o projeto local.
Esperava abrir a tela em http://localhost:5183.
Mas apareceu este erro:
[cole o erro completo aqui]
Me explique em linguagem simples e corrija.
```

Quando nao entender um conceito:

```text
Explique o que e backend usando o exemplo deste projeto.
Fale como se eu nunca tivesse programado.
```

Quando quiser confirmar se esta certo:

```text
Confira se meu .env esta no formato correto, mas nao mostre nem repita meu token real.
```

## 38. Checklist para o aluno antes de pedir socorro

Antes de chamar o instrutor, conferir:

1. Pedi para a IA instalar as dependencias?
2. Passei o token para a IA configurar o `.env`?
3. A IA confirmou que salvou o token em `TWYGO_API_TOKEN`?
4. Pedi para a IA abrir o projeto local?
5. Abri `http://localhost:5183`?
6. O backend abriu em `http://localhost:5184/health`?
7. O CSV tem a coluna `email`?
8. O email do CSV bate com o email da Twygo?
9. Copiei o erro inteiro?
10. Tentei explicar o que eu esperava que acontecesse?

## 39. Resumo ultra rapido

`Frontend`

A tela que o usuario ve.

`Backend`

A parte escondida que busca dados e protege o token.

`API`

Forma de um sistema conversar com outro.

`Endpoint`

Endereco especifico dentro de uma API.

`Token`

Chave de acesso.

`.env`

Arquivo local onde ficam configuracoes sensiveis.

`CSV`

Planilha simples em texto.

`JSON`

Formato comum de resposta de API.

`localhost`

O proprio computador.

`porta`

Entrada especifica para acessar um sistema local.

`Git`

Historico do projeto.

`GitHub`

Lugar online onde o repositorio fica salvo.

## 40. Mensagem final para a turma

Voce nao precisa decorar tudo.

O objetivo e entender o caminho:

```text
tela -> backend -> API -> dados -> CSV -> cruzamento -> graficos
```

Se voce entendeu esse caminho, ja entendeu a parte mais importante do workshop.
