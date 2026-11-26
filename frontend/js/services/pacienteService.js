import { api } from '../api.js';

// Limpar e validar ANTES de gastar uma requisição.
// O backend valida de novo: nunca confie só no front.
function preparar({ nome, cpf, telefone }) {
  const dados = {
    nome: (nome ?? '').trim(),
    cpf: (cpf ?? '').replace(/\D/g, ''), // fica só com os dígitos
    telefone: (telefone ?? '').trim() || null,
  };
  if (!dados.nome) throw new Error('Informe o nome.');
  if (dados.cpf.length !== 11) throw new Error('O CPF precisa ter 11 dígitos.');
  return dados;
}

export const pacienteService = {
  listar() {
    return api.get('/pacientes');
  },

  async criar(dados) {
    return api.post('/pacientes', preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/pacientes/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/pacientes/${id}`);
  },
};