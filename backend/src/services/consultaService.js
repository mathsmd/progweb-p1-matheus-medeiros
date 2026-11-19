import { consultaModel } from '../models/consultaModel.js';
import { pacienteModel } from '../models/pacienteModel.js';
import { erro } from '../utils/erro.js';

const STATUS = ['agendada', 'concluida', 'cancelada'];

export const consultaService = {
  listar(pacienteId) {
    if (pacienteId) return consultaModel.listarPorPaciente(Number(pacienteId));
    return consultaModel.listar();
  },

  buscarPorId(id) {
    const consulta = consultaModel.buscarPorId(id);
    if (!consulta) throw erro(404, 'Consulta não encontrada');
    return consulta;
  },

  criar({ pacienteId, medico, dataHora, status = 'agendada' } = {}) {
    if (!pacienteId || !medico || !dataHora) {
      throw erro(400, 'Campos "pacienteId", "medico" e "dataHora" são obrigatórios');
    }
    if (!STATUS.includes(status)) {
      throw erro(400, `Status deve ser um de: ${STATUS.join(', ')}`);
    }
    // Regra: o paciente precisa existir
    if (!pacienteModel.buscarPorId(Number(pacienteId))) {
      throw erro(422, 'Paciente informado não existe');
    }
    // Regra: o médico não pode ter duas consultas no mesmo horário
    if (consultaModel.existeConflito(medico, dataHora)) {
      throw erro(409, 'Este médico já tem consulta neste horário');
    }
    return consultaModel.inserir({ pacienteId, medico, dataHora, status });
  },

  atualizar(id, dados = {}) {
    if (dados.status !== undefined && !STATUS.includes(dados.status)) {
      throw erro(400, `Status deve ser um de: ${STATUS.join(', ')}`);
    }
    const atualizada = consultaModel.atualizar(id, dados);
    if (!atualizada) throw erro(404, 'Consulta não encontrada');
    return atualizada;
  },

  remover(id) {
    const removida = consultaModel.remover(id);
    if (!removida) throw erro(404, 'Consulta não encontrada');
  },
};