# Agenda Clínica

Sistema de agenda para clínica: cadastro e controle de [suas duas entidades].
Projeto 1 da disciplina Programação Web (UEPB, 2026.2).

- **Aplicação:** https://agenda-clinica-theta-coral.vercel.app
- **API:** https://agenda-clinica-matheus.onrender.com
- **Vídeo de apresentação:** (https://drive.google.com/file/d/1flALaDmW0_FJTyVobxTozZ5Eg0377_m5/view?usp=sharing)

> A API está no plano grátis do Render: o primeiro acesso pode levar cerca de
> um minuto, e os dados voltam aos de exemplo a cada reinício do serviço.

## Tecnologias

- Backend: Node.js 22, Express 5, SQLite (`node:sqlite`, SQL puro)
- Frontend: HTML, CSS, Bootstrap 5, JavaScript puro (ES Modules, `fetch`)

## Como rodar localmente

Pré-requisito: Node.js 22 ou superior.

```bash
# 1. API
cd backend
npm install
cp .env.example .env
npm run dev                      # http://localhost:3000

# 2. Frontend (em outro terminal)
cd frontend
npx http-server -p 5500 -c-1     # http://localhost:5500
```

## Rotas da API

(tabela com método, rota, o que faz e status; copie do seu backend/TESTES.md)

Erros seguem o formato `{ "erro": "mensagem" }`.

## Regras de negócio

- (uma linha por regra: o que é validado e qual status devolve)

## Estrutura

(copie a árvore do roteiro e ajuste aos nomes reais das suas pastas)

## Autor

Matheus Medeiros · Ciência da Computação · UEPB