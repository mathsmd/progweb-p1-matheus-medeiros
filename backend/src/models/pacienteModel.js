// "Banco de dados" em memória. Na S5 vira SQLite.
let pacientes = [];
let proximoId = 1;

export const pacienteModel = {
  listar() {
    return pacientes;
  },

  buscarPorId(id) {
    return pacientes.find((p) => p.id === id) ?? null;
  },

  existeCpf(cpf) {
    return pacientes.some((p) => p.cpf === cpf);
  },

  inserir({ nome, cpf, telefone }) {
    const novo = { id: proximoId++, nome, cpf, telefone: telefone ?? null };
    pacientes.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const i = pacientes.findIndex((p) => p.id === id);
    if (i === -1) return null;
    pacientes[i] = { ...pacientes[i], ...dados, id };
    return pacientes[i];
  },

  remover(id) {
    const antes = pacientes.length;
    pacientes = pacientes.filter((p) => p.id !== id);
    return pacientes.length < antes;
  },
};