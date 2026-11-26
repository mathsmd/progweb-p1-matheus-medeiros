# Telas do Projeto 1 (S4)

Front: `npx http-server -p 5500 -c-1` em `frontend/` · API: `npm run dev` em `backend/`

| Lista | Estado | Como provocar | O que aparece |
|---|---|---|---|
| Pacientes | carregando | Network → Slow 3G → F5 | spinner "Carregando pacientes…" |
| Pacientes | vazio | remover todos os registros pela tela, sem reiniciar a API | "Nenhum paciente ainda. Cadastre o primeiro no formulário." |
| Pacientes | erro | Ctrl+C na API → F5 | "Não consegui falar com a API. Ela está rodando?" + botão Tentar de novo |
| Pacientes | sucesso | abrir a página com a API no ar | tabela com os pacientes cadastrados |
| Consultas | carregando | Network → Slow 3G → F5 | spinner "Carregando consultas…" |
| Consultas | vazio | remover todas as consultas pela tela, sem reiniciar a API | "Nenhuma consulta ainda. Cadastre um paciente e agende a primeira." |
| Consultas | erro | Ctrl+C na API → F5 | "Não consegui falar com a API. Ela está rodando?" + botão Tentar de novo |
| Consultas | sucesso | agendar uma consulta para um paciente | tabela com o nome do paciente e a data formatada |
| Consultas | erro de regra | agendar o mesmo médico no mesmo horário duas vezes | aviso vermelho "Este médico já tem consulta neste horário" (409) |
| Pacientes | erro de regra | cadastrar dois pacientes com o mesmo CPF | aviso vermelho "Já existe um paciente com este CPF" (409) |
| Pacientes | erro de regra | remover um paciente que tem consultas | aviso vermelho "Paciente possui consultas. Remova as consultas primeiro." (409) |
| Consultas | validação do front | agendar sem escolher o paciente | aviso vermelho "Selecione o paciente." e nenhuma requisição na Network |

## Camadas

- api: `js/api.js` · services: `js/services/` · state: `js/state/store.js` · ui: `js/ui/`