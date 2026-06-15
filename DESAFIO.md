# Desafio - Painel de Capacitacao com API Twygo + CSV

## Contexto

Voce trabalha em uma empresa que usa a Twygo para gerenciar usuarios e treinamentos.

A empresa quer um painel simples para responder perguntas como:

- Quantas pessoas aparecem na base da Twygo?
- Quais pessoas tambem aparecem na planilha de capacitacao?
- Quantas horas de capacitacao cada area tem?
- Quais categorias de curso aparecem mais?
- Quais usuarios estao com dados cruzados corretamente?

O objetivo do desafio e criar um sisteminha local que conecte a API da Twygo com uma planilha CSV e mostre os resultados de forma visual.

## Como voce vai trabalhar

Neste desafio, voce vai usar Claude ou Codex.

Voce nao precisa escrever tudo sozinho.

O formato esperado e:

```text
voce da prompts -> a IA altera o projeto -> voce confere o resultado -> voce pede ajustes
```

Nao tenha vergonha de pedir explicacao.

Um bom prompt e melhor do que tentar adivinhar.

## O que voce vai receber

O instrutor vai entregar:

1. Link do repositorio do projeto.
2. Token da API da Twygo.
3. Arquivo CSV de capacitacao.
4. Apostila de conceitos.

O CSV ja vem pronto.

Voce nao precisa criar os dados da planilha.

## Missao do desafio

Criar um painel local chamado:

```text
Painel de capacitacao
```

Esse painel precisa:

1. Buscar usuarios reais na API da Twygo.
2. Permitir anexar um CSV de capacitacao.
3. Cruzar os usuarios da API com os dados do CSV usando o email.
4. Mostrar uma listagem de usuarios com os dados cruzados.
5. Mostrar cards de resumo.
6. Mostrar graficos por area, categoria e status.
7. Proteger o token da API usando `.env`.

## Regra principal do cruzamento

O cruzamento deve ser feito pelo campo:

```text
email
```

Se o email do usuario na Twygo for igual ao email de uma linha do CSV, os dados devem ser juntados.

Exemplo:

```text
API da Twygo:
ana@empresa.com - Ana Silva

CSV:
ana@empresa.com - 6 horas de capacitacao

Resultado:
Ana Silva - 6 horas de capacitacao
```

## Regra sobre area

A area deve vir do perfil do usuario na Twygo sempre que existir.

Regra esperada:

1. Se o usuario tem area/departamento no perfil, usar essa area.
2. Se nao tiver area, tentar usar algum campo parecido do perfil.
3. Se nao existir nada, mostrar `Sem area no perfil`.

Areas esperadas no desafio:

- Diretoria Executiva
- Backoffice
- Financeiro
- Recursos Humanos
- Gestao de conteudo
- Conteudo
- Marketing
- Geracao de Leads
- Design de Marketing
- Sucesso do Cliente
- Atendimento
- Engajamento
- Produto e Qualidade
- Engenharia de Produto
- Qualidade e Testes
- Sustentacao
- Vendas
- Qualificacao
- Solucoes
- Engenharia
- Arquitetura Tecnologica
- Desenvolvimento
- Business Intelligence
- Dados e Hubspot

## Formato esperado do CSV

O CSV deve ter estas colunas:

```text
email,area,categoria,curso,horas_capacitacao,status_capacitacao,nota,concluido_em
```

O instrutor vai fornecer o arquivo pronto.

Voce deve apenas anexar o CSV no painel.

## O que a tela precisa ter

Seu painel deve ter:

1. Titulo claro do painel.
2. Area para anexar o CSV.
3. Status da conexao com a API da Twygo.
4. Cards de resumo.
5. Lista ou tabela de usuarios.
6. Dados cruzados de capacitacao.
7. Grafico de pizza ou donut.
8. Grafico de barras.
9. Mensagem amigavel quando faltar CSV.
10. Mensagem amigavel quando acontecer erro.

## Cards de resumo sugeridos

Crie pelo menos 4 cards.

Sugestoes:

- Total de usuarios da Twygo
- Usuarios encontrados no CSV
- Total de horas de capacitacao
- Media de horas por usuario
- Cursos concluidos
- Areas com capacitacao

## Graficos sugeridos

Crie pelo menos 2 graficos.

Sugestoes:

- Donut por area
- Donut por status de capacitacao
- Barras por categoria
- Barras por horas de capacitacao por area

## O que nao pode fazer

Nao coloque o token da Twygo dentro do frontend.

Nao publique o token no GitHub.

Nao apague arquivos do projeto sem pedir para a IA explicar antes.

Nao use dados negativos, ofensivos ou constrangedores na planilha.

Nao crie busca manual como funcao principal. O objetivo e mostrar uma listagem cruzada e graficos.

## Como pedir para Claude ou Codex comecar

Use este prompt:

```text
Quero construir o desafio do Painel de capacitacao com API Twygo + CSV.
Leia os arquivos do projeto e me explique o que ja existe.
Depois me diga, em linguagem simples, qual sera o primeiro passo.
Nao escreva explicacao tecnica demais.
```

Depois use:

```text
Prepare o projeto para rodar localmente.
Crie o arquivo .env a partir do .env.example.
Me diga onde devo colar o token da Twygo.
Nao mostre meu token real na resposta.
```

Depois de colocar o token:

```text
Abra o projeto local e confira se a API da Twygo esta respondendo.
Se der erro, explique em linguagem simples e corrija.
```

## Prompts permitidos durante o desafio

Para entender uma parte:

```text
Explique o que esse arquivo faz usando o exemplo do nosso desafio.
Fale como se eu nunca tivesse programado.
```

Para pedir uma melhoria:

```text
Melhore essa tela para ficar mais clara para uma pessoa de RH ou treinamento.
Nao mude a regra de cruzamento por email.
```

Para corrigir erro:

```text
Deu este erro:
[cole o erro aqui]
Explique o motivo em linguagem simples e corrija.
```

Para validar:

```text
Confira se o painel atende ao desafio:
- busca usuarios da Twygo
- anexa CSV
- cruza por email
- mostra cards
- mostra tabela
- mostra graficos
- protege o token no .env
Se faltar algo, corrija.
```

## Entrega esperada

No final, voce deve conseguir mostrar:

1. O painel aberto no navegador.
2. Usuarios carregados da Twygo.
3. CSV anexado.
4. Tabela com dados cruzados.
5. Cards de resumo preenchidos.
6. Graficos aparecendo.
7. Token protegido no `.env`.

## Criterios de sucesso

O desafio esta correto se:

- A tela abre sem erro.
- A API da Twygo responde.
- O CSV e aceito.
- O cruzamento usa `email`.
- A listagem mostra usuarios e capacitacoes.
- Os cards fazem sentido.
- Os graficos aparecem.
- O token nao aparece na tela.
- O token nao aparece no GitHub.
- A explicacao final do aluno faz sentido.

## Apresentacao final

Quando terminar, explique em voz alta:

```text
Eu criei um painel local que busca usuarios na API da Twygo, recebe um CSV de capacitacao, cruza os dados pelo email e mostra indicadores em cards, tabela e graficos.
```

Se perguntarem por que existe backend:

```text
Porque o backend protege o token da API. A tela chama o backend, e o backend chama a Twygo.
```

Se perguntarem por que usamos CSV:

```text
Porque o CSV representa uma planilha externa de capacitacao que precisa ser cruzada com os usuarios da plataforma.
```

## Dica final

Nao tente decorar o codigo.

Tente entender o fluxo:

```text
API da Twygo -> usuarios
CSV -> capacitacoes
email -> cruzamento
painel -> cards, tabela e graficos
```

Se voce consegue explicar esse fluxo, voce entendeu o desafio.
