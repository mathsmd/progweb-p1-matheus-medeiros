import { api } from '../api.js';

const STATUS = ['agendada', 'concluida', 'cancelada'];

// Limpar e validar ANTES de gastar uma requisição.
// O backend valida de novo (inclusive o conflito de horário do médico).
function preparar({ pacienteId, medico, dataHora, status }) {
  if (!pacienteId) throw new Error('Selecione o paciente.');
  const nomeMedico = (medico ?? '').trim();
  if (!nomeMedico) throw new Error('Informe o médico.');
  if (!dataHora) throw new Error('Informe a data e a hora.');
  if (!STATUS.includes(status)) throw new Error('Status inválido.');

  // Formulário só entrega string: convertemos o id antes de enviar
  return { pacienteId: Number(pacienteId), medico: nomeMedico, dataHora, status };
}

export const consultaService = {
  listar() {
    return api.get('/consultas');
  },

  async criar(dados) {
    return api.post('/consultas', preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/consultas/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/consultas/${id}`);
  },
};