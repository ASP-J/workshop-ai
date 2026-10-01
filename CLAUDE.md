# Instruções para o Claude: projeto do workshop

Quem está usando este projeto **não programa**. Responda sempre em português, sem jargão, e explique o plano antes de alterar arquivos. Depois de cada mudança, diga quais arquivos mudaram e qual endereço abrir para conferir (`http://localhost:5183`).

## Token e dados (regras inegociáveis)

- **Nunca leia, mostre, copie ou commite o `.env`.** Não rode `cat .env` nem nada que imprima o token.
- Para configurar o token: crie o `.env` a partir do `.env.example` e abra o arquivo para a pessoa colar (`open -e .env` no Mac, `notepad .env` no Windows). Ela substitui o texto de exemplo depois de `TWYGO_API_TOKEN=`, salva e avisa "pronto". **Nunca peça o token no chat.**
- Se a pessoa colar o token no chat mesmo assim: grave no `.env`, não repita o token e recomende revogá-lo depois do workshop.
- Para conferir se o token funciona, use `http://localhost:5184/health` e `/api/users?all=true`, e fale **só em contagens** (ex.: "186 usuários"). Nunca liste nomes ou e-mails reais na resposta.
- A planilha `public/capacitacao_workshop.csv` tem e-mails reais da Twygo: não envie para serviços externos.

## Mac ou Windows? (descubra antes do primeiro comando)

Veja a plataforma no seu contexto (`darwin` = Mac, `win32` = Windows; na dúvida, `node -p process.platform`). O projeto roda igual nos dois (`npm install`, `npm run dev`, `npm test`, `npm run build` — sem comandos de Mac nos scripts). Muda só o que você manda a pessoa digitar:

| Para | Mac | Windows (Prompt de Comando) |
|---|---|---|
| Criar o `.env` | `cp .env.example .env` | `copy .env.example .env` |
| Abrir o `.env` para a pessoa | `open -e .env` | `notepad .env` |
| Existe o `.env`? (sem abrir) | `test -f .env && echo existe` | `if exist .env echo existe` |
| Quem usa a porta? | `lsof -i :5183 -i :5184` | `netstat -ano \| findstr :5183` (PID no fim; `taskkill /PID <n> /F` só com o ok da pessoa) |
| Conferir o backend | `curl -s http://127.0.0.1:5184/health` | `curl.exe -s http://127.0.0.1:5184/health` |

- **No Windows nunca** use `cp`, `open -e`, `rm -rf`, `lsof` nem `VAR=valor comando` no que a pessoa vai digitar. Caminhos usam `\` e caminhos com espaço vão **entre aspas**.
- Node ausente ou antigo (`'node' não é reconhecido`, versão < 22.12): oriente instalar o **LTS** de <https://nodejs.org/pt> e **reabrir o terminal**. Não instale Node por gerenciadores (choco, winget, nvm) sem a pessoa pedir.
- PowerShell bloqueando `npm` ("execução de scripts foi desabilitada"): sugira o Prompt de Comando (`cmd`) ou `npm.cmd`; só se ela quiser, `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. No PowerShell antigo `&&` não funciona: um comando por linha.
- Pasta dentro do **OneDrive** (caminho com `OneDrive`) deixa o `npm install` lento e dá `EPERM`/`EBUSY`: sugira mover para `C:\workshop`.
- Porta ocupada e não dá para fechar o outro programa: troque no `.env` (`PORT=` do backend, `CLIENT_PORT=` da tela) e avise que o endereço muda.

## Rodar só local

- Tudo roda em `127.0.0.1`: tela em 5183 e backend em 5184 (dá para trocar com `CLIENT_PORT` / `PORT` no `.env`; o `127.0.0.1` nunca). Nunca publique, faça deploy nem torne nada público.
- Comandos: `npm install`, `npm run dev`, `npm test`, `npm run build`.

## Números esperados com o CSV do workshop

186 usuários da API · 287 linhas e 160 e-mails no CSV · 150 e-mails cruzados (só 50 se buscar só a página 1) · 10 e-mails de teste (`pessoa01` a `pessoa10@anonimizado.com`) que não cruzam de propósito · 36 usuários sem capacitação.

O painel **já vem pronto**: o exercício é rodar, entender, conferir e evoluir. Ao pedir melhorias, não duplique cards ou gráficos que já existem; sugira algo novo.
