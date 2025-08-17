const express = require('express');
const cors = require('cors'); // <--- ✅ Importa cors
const app = express();
const PORT = 3000;

const pool = require('./db');
const torneiRouter = require('./api/tornei');
const loginRouter = require('./api/login');
const partiteRouter = require('./api/partite');
const utentiRouter = require('./api/utenti');

app.use(cors()); // <--- ✅ Abilita CORS
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Server attivo!');
});

// Collega tutte le rotte del router sotto /api
app.use('/api/tornei', torneiRouter);
app.use('/api/login', loginRouter);
app.use('/api/partite', partiteRouter);
app.use('/api/utenti', utentiRouter);
// ...altre rotte

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
