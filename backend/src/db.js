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