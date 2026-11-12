let consultas = [];
let proximoId = 1;

export const consultaModel = {
  listar() {
    return consultas;
  },

  listarPorPaciente(pacienteId) {
    return consultas.filter((c) => c.pacienteId === pacienteId);
  },

  buscarPorId(id) {
    return consultas.find((c) => c.id === id) ?? null;
  },

  // O médico já tem consulta (não cancelada) nesse horário?
  existeConflito(medico, dataHora) {
    return consultas.some(
      (c) => c.medico === medico && c.dataHora === dataHora && c.status !== 'cancelada'
    );
  },

  inserir({ pacienteId, medico, dataHora, status }) {
    const nova = {
      id: proximoId++,
      pacienteId: Number(pacienteId),
      medico,
      dataHora,
      status,
    };
    consultas.push(nova);
    return nova;
  },

  atualizar(id, dados) {
    const i = consultas.findIndex((c) => c.id === id);
    if (i === -1) return null;
    consultas[i] = { ...consultas[i], ...dados, id };
    return consultas[i];
  },

  remover(id) {
    const antes = consultas.length;
    consultas = consultas.filter((c) => c.id !== id);
    return consultas.length < antes;
  },
};