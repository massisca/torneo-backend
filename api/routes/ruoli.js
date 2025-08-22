const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET tutti i ruoli
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM TB_ruolo');
    res.json(result.rows);
  } catch (err) {
    console.error('Errore GET ruoli:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// POST nuovo ruolo
router.post('/', async (req, res) => {
  const { cod_ruolo, nome_ruolo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO TB_ruolo (cod_ruolo, nome_ruolo) VALUES ($1, $2) RETURNING *',
      [cod_ruolo, nome_ruolo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Errore POST ruolo:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// PUT modifica ruolo
router.put('/:cod_ruolo', async (req, res) => {
  const { cod_ruolo } = req.params;
  const { nome_ruolo } = req.body;
  try {
    const result = await pool.query(
      'UPDATE TB_ruolo SET nome_ruolo = $1 WHERE cod_ruolo = $2 RETURNING *',
      [nome_ruolo, cod_ruolo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Errore PUT ruolo:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// DELETE ruolo
router.delete('/:cod_ruolo', async (req, res) => {
  try {
    await pool.query('DELETE FROM TB_ruolo WHERE cod_ruolo = $1', [req.params.cod_ruolo]);
    res.json({ message: 'Ruolo eliminato' });
  } catch (err) {
    console.error('Errore DELETE ruolo:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

module.exports = router;


