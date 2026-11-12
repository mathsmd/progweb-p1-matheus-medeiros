import { pacienteModel } from '../models/pacienteModel.js';
import { erro } from '../utils/erro.js';

export const pacienteService = {
  listar() {
    return pacienteModel.listar();
  },

  buscarPorId(id) {
    const paciente = pacienteModel.buscarPorId(id);
    if (!paciente) throw erro(404, 'Paciente não encontrado');
    return paciente;
  },

  criar({ nome, cpf, telefone } = {}) {
    // Regra 1: nome e cpf são obrigatórios
    if (!nome || !cpf) throw erro(400, 'Campos "nome" e "cpf" são obrigatórios');
    // Regra 2: cpf é único
    if (pacienteModel.existeCpf(cpf)) throw erro(409, 'Já existe um paciente com este CPF');
    return pacienteModel.inserir({ nome, cpf, telefone });
  },

  atualizar(id, dados = {}) {
    const atualizado = pacienteModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, 'Paciente não encontrado');
    return atualizado;
  },

  remover(id) {
    const removido = pacienteModel.remover(id);
    if (!removido) throw erro(404, 'Paciente não encontrado');
  },
};