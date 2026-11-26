import { DatabaseSync } from 'node:sqlite';

// O banco é um arquivo só. Se não existir, o SQLite cria.
const arquivo = process.env.DB_FILE ?? 'banco.db';
export const db = new DatabaseSync(arquivo);

// Por padrão o SQLite não confere chave estrangeira. Liga a cada conexão.
db.exec('PRAGMA foreign_keys = ON;');

// Roda toda vez que o servidor sobe, por isso o IF NOT EXISTS.
db.exec(`
  CREATE TABLE IF NOT EXISTS pacientes (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nome     TEXT NOT NULL,
    cpf      TEXT NOT NULL UNIQUE,
    telefone TEXT
  );

  CREATE TABLE IF NOT EXISTS consultas (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL REFERENCES pacientes(id),
    medico      TEXT NOT NULL,
    data_hora   TEXT NOT NULL,
    status      TEXT NOT NULL CHECK (status IN ('agendada', 'concluida', 'cancelada'))
  );
`);
// Dados de exemplo: só entram se o banco estiver vazio.
// No Render grátis o arquivo some a cada reinício; assim a demonstração
// nunca abre vazia. Tudo inventado: nenhum CPF ou telefone é de pessoa real.
const { total } = db.prepare('SELECT COUNT(*) AS total FROM pacientes').get();
if (total === 0) {
  const inserirPaciente = db.prepare(
    'INSERT INTO pacientes (nome, cpf, telefone) VALUES (?, ?, ?)'
  );
  const inserirConsulta = db.prepare(
    `INSERT INTO consultas (paciente_id, medico, data_hora, status)
     VALUES (?, ?, ?, ?)`
  );

  const maria = inserirPaciente.run('Maria das Dores Lima', '11122233344', '83900000001');
  const jose = inserirPaciente.run('José Carlos Ferreira', '22233344455', '83900000002');
  const ana = inserirPaciente.run('Ana Beatriz Souza', '33344455566', null);

  inserirConsulta.run(maria.lastInsertRowid, 'Dra. Helena Duarte', '2026-12-02T09:00', 'agendada');
  inserirConsulta.run(maria.lastInsertRowid, 'Dr. João Mendes', '2026-12-09T14:30', 'agendada');
  inserirConsulta.run(jose.lastInsertRowid, 'Dra. Helena Duarte', '2026-12-02T10:00', 'concluida');
  inserirConsulta.run(ana.lastInsertRowid, 'Dr. João Mendes', '2026-12-10T08:00', 'cancelada');
}