// Camada de UI das consultas. Mesmo molde da pacienteView, com um <select> a mais.
const el = {
  form: document.querySelector('#form-consulta'),
  paciente: document.querySelector('#consulta-paciente'),
  salvar: document.querySelector('#consulta-salvar'),
  cancelar: document.querySelector('#consulta-cancelar'),
  carregando: document.querySelector('#consultas-carregando'),
  erro: document.querySelector('#consultas-erro'),
  erroMsg: document.querySelector('#consultas-erro-msg'),
  recarregar: document.querySelector('#consultas-recarregar'),
  vazio: document.querySelector('#consultas-vazio'),
  sucesso: document.querySelector('#consultas-sucesso'),
  linhas: document.querySelector('#consultas-linhas'),
};

const NOME_STATUS = {
  agendada: 'Agendada',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
};

// id → nome, para mostrar o paciente sem outra requisição
let nomeDoPaciente = new Map();

function formatarDataHora(valor) {
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return valor; // formato desconhecido: mostra como veio
  return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function celula(texto, classe = '') {
  const td = document.createElement('td');
  td.textContent = texto; // dado do usuário entra como TEXTO, nunca como HTML
  td.className = classe;
  return td;
}

function botao(texto, acao, id, classe) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  b.className = `btn btn-sm ${classe}`;
  b.dataset.acao = acao;
  b.dataset.id = id;
  return b;
}

function linha(consulta, editandoId) {
  const tr = document.createElement('tr');
  if (consulta.id === editandoId) tr.className = 'editando';

  const paciente = nomeDoPaciente.get(consulta.pacienteId)
    ?? `paciente #${consulta.pacienteId} (removido)`; // consulta órfã: assunto da S5

  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(
    botao('Editar', 'editar', consulta.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', consulta.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(consulta.id),
    celula(paciente),
    celula(consulta.medico),
    celula(formatarDataHora(consulta.dataHora), 'numero text-nowrap'),
    celula(NOME_STATUS[consulta.status] ?? consulta.status),
    acoes,
  );
  return tr;
}

export const consultaView = {
  // Preenche o <select> com os pacientes que existem agora
  preencherPacientes(pacientes) {
    nomeDoPaciente = new Map(pacientes.map((p) => [p.id, p.nome]));
    const escolhido = el.paciente.value;

    const opcoes = pacientes.map((p) => new Option(`${p.nome} (#${p.id})`, p.id));
    el.paciente.replaceChildren(new Option('Selecione…', ''), ...opcoes);

    // mantém a escolha, se o paciente ainda existir
    if (nomeDoPaciente.has(Number(escolhido))) el.paciente.value = escolhido;
  },

  render({ status, consultas, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...consultas.map((c) => linha(c, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId ? 'Salvar alterações' : 'Agendar consulta';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(consulta) {
    el.form.pacienteId.value = consulta.pacienteId;
    el.form.medico.value = consulta.medico;
    el.form.dataHora.value = String(consulta.dataHora).slice(0, 16); // formato do datetime-local
    el.form.status.value = consulta.status;
    el.form.medico.focus();
  },

  limparForm() {
    el.form.reset();
  },

  aoEnviar(fn) {
    el.form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      fn(Object.fromEntries(new FormData(el.form)));
    });
  },

  aoCancelar(fn) {
    el.cancelar.addEventListener('click', fn);
  },

  aoRecarregar(fn) {
    el.recarregar.addEventListener('click', fn);
  },

  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('button[data-acao]');
      if (!alvo) return;
      const id = Number(alvo.dataset.id);
      if (alvo.dataset.acao === 'editar') editar(id);
      if (alvo.dataset.acao === 'remover') remover(id);
    });
  },
};