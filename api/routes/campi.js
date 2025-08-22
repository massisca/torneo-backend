const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM TB_campo');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Errore GET campi' });
  }
});

router.post('/', async (req, res) => {
  const { nome_campo, descrizione_campo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO TB_campo (nome_campo, descrizione_campo) VALUES ($1, $2) RETURNING *',
      [nome_campo, descrizione_campo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Errore POST campo' });
  }
});

router.put('/:id_campo', async (req, res) => {
  const { nome_campo, descrizione_campo } = req.body;
  try {
    const result = await pool.query(
      'UPDATE TB_campo SET nome_campo = $1, descrizione_campo = $2 WHERE id_campo = $3 RETURNING *',
      [nome_campo, descrizione_campo, req.params.id_campo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Errore PUT campo' });
  }
});

router.delete('/:id_campo', async (req, res) => {
  try {
    await pool.query('DELETE FROM TB_campo WHERE id_campo = $1', [req.params.id_campo]);
    res.json({ message: 'Campo eliminato' });
  } catch (err) {
    res.status(500).json({ error: 'Errore DELETE campo' });
  }
});

module.exports = router;

