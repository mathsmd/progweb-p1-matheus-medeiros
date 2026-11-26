import { db } from '../db.js';

// No banco: snake_case (paciente_id, data_hora). No JSON da API: camelCase
// (pacienteId, dataHora). O AS traduz aqui, na única camada que conhece o banco.
const COLUNAS = `id, paciente_id AS pacienteId, medico,
  data_hora AS dataHora, status`;

export const consultaModel = {
  listar() {
    return db.prepare(`SELECT ${COLUNAS} FROM consultas ORDER BY id`).all();
  },

  listarPorPaciente(pacienteId) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM consultas WHERE paciente_id = ? ORDER BY id`)
      .all(pacienteId);
  },

  buscarPorId(id) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM consultas WHERE id = ?`)
      .get(id) ?? null;
  },

  // O médico já tem consulta (não cancelada) nesse horário?
  existeConflito(medico, dataHora) {
    const linha = db
      .prepare(`SELECT 1 FROM consultas
                WHERE medico = ? AND data_hora = ? AND status <> 'cancelada'`)
      .get(medico, dataHora);
    return linha !== undefined;
  },

  inserir({ pacienteId, medico, dataHora, status }) {
    const r = db
      .prepare(`INSERT INTO consultas (paciente_id, medico, data_hora, status)
                VALUES (?, ?, ?, ?)`)
      .run(Number(pacienteId), medico, dataHora, status);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare(`UPDATE consultas
                SET paciente_id = ?, medico = ?, data_hora = ?, status = ?
                WHERE id = ?`)
      .run(Number(novo.pacienteId), novo.medico, novo.dataHora, novo.status, id);
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM consultas WHERE id = ?').run(id);
    return r.changes > 0;
  },
};