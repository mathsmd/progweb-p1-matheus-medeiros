# Telas do Projeto 1 (S4)

Front: `npx http-server -p 5500 -c-1` em `frontend/` · API: `npm run dev` em `backend/`

| Lista | Estado | Como provocar | O que aparece |
|---|---|---|---|
| Pacientes | carregando | Network → Slow 3G → F5 | spinner "Carregando pacientes…" |
| Pacientes | vazio | API recém-iniciada | "Nenhum paciente ainda. Cadastre o primeiro no formulário." |
| Pacientes | erro | Ctrl+C na API → F5 | "Não consegui falar com a API. Ela está rodando?" + botão Tentar de novo |
| Pacientes | sucesso | cadastrar "Maria Souza" | tabela com 1 linha |
| Consultas | carregando | Network → Slow 3G → F5 | spinner "Carregando consultas…" |
| Consultas | vazio | API recém-iniciada | "Nenhuma consulta ainda. Cadastre um paciente e agende a primeira." |
| Consultas | erro | Ctrl+C na API → F5 | "Não consegui falar com a API. Ela está rodando?" + botão Tentar de novo |
| Consultas | sucesso | agendar uma consulta para a Maria | tabela com o nome da paciente e a data formatada |
| Consultas | erro de regra | agendar o mesmo médico no mesmo horário duas vezes | aviso vermelho "Este médico já tem consulta neste horário" (409) |
| Pacientes | erro de regra | cadastrar dois pacientes com o mesmo CPF | aviso vermelho "Já existe um paciente com este CPF" (409) |
| Consultas | validação do front | agendar sem escolher o paciente | aviso vermelho "Selecione o paciente." e nenhuma requisição na Network |

## Camadas

- api: `js/api.js` · services: `js/services/` · state: `js/state/store.js` · ui: `js/ui/`