# Testes da API — Projeto 1 (S3)

API: Clínica · entidades: Paciente e Consulta · servidor: `npm run dev` em http://localhost:3000

| # | Método | URL | Body | Status obtido | Observação |
|---|---|---|---|---|---|
| 1 | POST | /pacientes | {"nome":"Maria Souza","cpf":"111.111.111-11","telefone":"83999990000"} | 201 | cria paciente |
| 2 | POST | /pacientes | {"nome":"Maria Dup","cpf":"111.111.111-11"} | 409 | regra: cpf único |
| 3 | POST | /pacientes | {"cpf":"222"} | 400 | campo "nome" obrigatório |
| 4 | POST | /consultas | {"pacienteId":1,"medico":"Dr. João","dataHora":"2026-11-20T09:00"} | 201 | cria consulta |
| 5 | POST | /consultas | {"pacienteId":1,"medico":"Dr. João","dataHora":"2026-11-20T09:00"} | 409 | regra: médico sem dois horários iguais |
| 6 | POST | /consultas | {"pacienteId":999,"medico":"Dra. Ana","dataHora":"2026-11-20T10:00"} | 422 | paciente não existe |
| 7 | POST | /consultas | {"pacienteId":1,"medico":"Dra. Ana","dataHora":"2026-11-20T10:00","status":"pendente"} | 400 | status inválido |
| 8 | GET | /consultas?pacienteId=1 | — | 200 | filtro 1:N |
| 9 | GET | /pacientes/99 | — | 404 | não encontrado |
| 10 | PUT | /consultas/1 | {"status":"concluida"} | 200 | atualiza status |
| 11 | DELETE | /pacientes/1 | — | 204 | remove paciente |