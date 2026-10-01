# Instruções para o Claude: projeto do workshop

Quem está usando este projeto **não programa**. Responda sempre em português, sem jargão, e explique o plano antes de alterar arquivos. Depois de cada mudança, diga quais arquivos mudaram e qual endereço abrir para conferir (`http://localhost:5183`).

## Token e dados (regras inegociáveis)

- **Nunca leia, mostre, copie ou commite o `.env`.** Não rode `cat .env` nem nada que imprima o token.
- Para configurar o token: crie o `.env` a partir do `.env.example` e abra o arquivo para a pessoa colar (`open -e .env` no Mac, `notepad .env` no Windows). Ela substitui o texto de exemplo depois de `TWYGO_API_TOKEN=`, salva e avisa "pronto". **Nunca peça o token no chat.**
- Se a pessoa colar o token no chat mesmo assim: grave no `.env`, não repita o token e recomende revogá-lo depois do workshop.
- Para conferir se o token funciona, use `http://localhost:5184/health` e `/api/users?all=true`, e fale **só em contagens** (ex.: "186 usuários"). Nunca liste nomes ou e-mails reais na resposta.
- A planilha `public/capacitacao_workshop.csv` tem e-mails reais da Twygo: não envie para serviços externos.

## Rodar só local

- Tudo roda em `127.0.0.1`: tela em 5183 e backend em 5184. Nunca publique, faça deploy nem torne nada público.
- Comandos: `npm install`, `npm run dev`, `npm test`, `npm run build`.

## Números esperados com o CSV do workshop

186 usuários da API · 287 linhas e 160 e-mails no CSV · 150 e-mails cruzados (só 50 se buscar só a página 1) · 10 e-mails de teste (`pessoa01` a `pessoa10@anonimizado.com`) que não cruzam de propósito · 36 usuários sem capacitação.

O painel **já vem pronto**: o exercício é rodar, entender, conferir e evoluir. Ao pedir melhorias, não duplique cards ou gráficos que já existem; sugira algo novo.
