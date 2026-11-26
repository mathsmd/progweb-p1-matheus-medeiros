import express from 'express';
import cors from 'cors';
import pacientesRouter from './routes/pacientes.js';
import consultasRouter from './routes/consultas.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Em produção, a origem do front vem da variável CORS_ORIGIN (várias, separadas
// por vírgula). Sem ela, valem as do nosso front local.
const origens = (process.env.CORS_ORIGIN
  ?? 'http://localhost:5500,http://127.0.0.1:5500')
  .split(',')
  .map((o) => o.trim());

// --- Middleware global (antes das rotas) ---
app.use(cors({ origin: origens }));
app.use(express.json());
app.use(logger);

// --- Health check ---
app.get('/', (req, res) => {
  res.json({ api: 'Clínica API', versao: '1.0.0', rotas: ['/pacientes', '/consultas'] });
});

// --- Rotas ---
app.use('/pacientes', pacientesRouter);
app.use('/consultas', consultasRouter);

// --- 404 para rotas que não existem ---
app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.url} não existe` });
});

// --- Tratador de erro: SEMPRE o último ---
app.use(errorHandler);

export default app;