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


// ...altre rotte
app.use('/api/tornei', torneiRouter);
app.use('/api', loginRouter);
app.use('/api/partite', partiteRouter);

// ...altre rotte

// Porta dinamica per Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
