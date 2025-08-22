const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Rotte API
const torneiRouter = require('./api/tornei');
const loginRouter = require('./api/login');
const partiteRouter = require('./api/partite');
const ruoliRouter = require('./api/routes/ruoli');
const fasiRouter = require('./api/routes/fasi');
const puntiRouter = require('./api/routes/punti');
const campiRouter = require('./api/routes/campi');
const formuleRouter = require('./api/routes/formule');


// ...altre rotte
app.use('/api/tornei', torneiRouter);
app.use('/api', loginRouter);
app.use('/api/partite', partiteRouter);
app.use('/api/ruoli', ruoliRouter);
app.use('/api/fasi', fasiRouter);
app.use('/api/punti', puntiRouter);
app.use('/api/campi', campiRouter);
app.use('/api/formule', formuleRouter);

// ...altre rotte

// Porta dinamica per Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
