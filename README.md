# Agenda da Clínica

Sistema para a recepção de uma clínica cadastrar pacientes e marcar consultas com os médicos. Cada consulta guarda o paciente, o médico, o dia e a hora e o status (agendada, concluída ou cancelada), e o sistema não deixa o mesmo médico ter dois atendimentos no mesmo horário.

Projeto 1 da disciplina Programação Web (UEPB, 2026.2).

- **Aplicação:** (link da Vercel)
- **API:** (link do Render)
- **Vídeo de apresentação:** (link)

> A API roda no plano grátis do Render. O primeiro acesso depois de um tempo parado pode levar cerca de um minuto, e a cada reinício os dados voltam aos de exemplo.

## Tecnologias

- Backend: Node.js 22, Express 5 e SQLite pelo módulo `node:sqlite`, com SQL puro (sem ORM)
- Frontend: HTML, CSS, Bootstrap 5 e JavaScript puro (ES Modules e `fetch`), sem framework

## Como rodar na sua máquina

Precisa do Node.js 22 ou superior.

```bash
# 1. API
cd backend
npm install
cp .env.example .env           # no cmd do Windows: copy .env.example .env
npm run dev                    # http://localhost:3000

# 2. Frontend (em outro terminal)
cd frontend
npx http-server -p 5500 -c-1   # http://localhost:5500
```

O banco (`banco.db`) é criado sozinho na primeira execução, já com três pacientes e quatro consultas de exemplo, todos inventados.

## Rotas da API

| Método | Rota | O que faz | Respostas |
|---|---|---|---|
| GET | /pacientes | Lista os pacientes | 200 |
| POST | /pacientes | Cadastra um paciente (nome e cpf obrigatórios) | 201, 400, 409 |
| GET | /pacientes/:id | Busca um paciente | 200, 404 |
| PUT | /pacientes/:id | Atualiza um paciente | 200, 404 |
| DELETE | /pacientes/:id | Remove um paciente | 204, 404, 409 |
| GET | /consultas | Lista as consultas (filtro opcional: `?pacienteId=1`) | 200 |
| POST | /consultas | Agenda uma consulta | 201, 400, 409, 422 |
| GET | /consultas/:id | Busca uma consulta | 200, 404 |
| PUT | /consultas/:id | Atualiza uma consulta | 200, 400, 404, 422 |
| DELETE | /consultas/:id | Remove uma consulta | 204, 404 |

Os erros voltam no formato `{ "erro": "mensagem" }`.

## Regras de negócio

- O CPF do paciente é único (409) e nome e CPF são obrigatórios (400).
- A consulta exige paciente, médico e data/hora (400), e o status só pode ser `agendada`, `concluida` ou `cancelada` (400).
- O paciente informado na consulta precisa existir (422).
- O mesmo médico não pode ter duas consultas não canceladas no mesmo horário (409).
- Um paciente que tem consultas não pode ser removido (409). O banco também garante isso, com chave estrangeira.

## Estrutura

```
backend/
  src/
    routes/        URL → controller
    controllers/   lê a requisição, chama o service, responde
    services/      regras de negócio
    models/        SQL (a única camada que conhece o banco)
    middleware/    logger e tratamento de erros
    db.js          conexão, schema e dados de exemplo
  TESTES.md        requisições testadas e status obtidos
frontend/
  js/
    api.js         camada HTTP (fetch)
    services/      limpa e valida os dados antes de enviar
    state/         estado da tela
    ui/            desenha na tela e captura os eventos
  TELAS.md         como provocar cada estado das listas
MODELAGEM.md       modelagem de classes (semana 2)
s1/ … s4/          exercícios das semanas
```

## Limitações conhecidas

- Ao editar um paciente para um CPF que já existe, o banco recusa, mas a API responde 500 em vez de 409.
- Ao editar uma consulta, o conflito de horário do médico não é verificado.
- A data e a hora só são exigidas, o formato não é validado.

## Decisões do projeto

(Escreva aqui, com suas palavras, duas ou três linhas: por que escolheu esse domínio e o que foi mais difícil de fazer.)

## Autor

Matheus Medeiros · UEPB