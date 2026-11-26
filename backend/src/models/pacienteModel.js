import { db } from '../db.js';

// Mesmo contrato da S3 (listar, buscarPorId, existeCpf, inserir,
// atualizar, remover). O array virou a tabela pacientes.
export const pacienteModel = {
  listar() {
    return db.prepare('SELECT * FROM pacientes ORDER BY id').all();
  },

  buscarPorId(id) {
    return db.prepare('SELECT * FROM pacientes WHERE id = ?').get(id) ?? null;
  },

  existeCpf(cpf) {
    const linha = db.prepare('SELECT 1 FROM pacientes WHERE cpf = ?').get(cpf);
    return linha !== undefined;
  },

  inserir({ nome, cpf, telefone }) {
    const r = db
      .prepare('INSERT INTO pacientes (nome, cpf, telefone) VALUES (?, ?, ?)')
      .run(nome, cpf, telefone ?? null);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE pacientes SET nome = ?, cpf = ?, telefone = ? WHERE id = ?')
      .run(novo.nome, novo.cpf, novo.telefone ?? null, id); // o id nunca muda
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM pacientes WHERE id = ?').run(id);
    return r.changes > 0; // true = removeu
  },
};