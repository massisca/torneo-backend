const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM TB_fase');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Errore GET fasi' });
  }
});

router.post('/', async (req, res) => {
  const { nome_fase } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO TB_fase (nome_fase) VALUES ($1) RETURNING *',
      [nome_fase]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Errore POST fase' });
  }
});

router.put('/:id_fase', async (req, res) => {
  const { nome_fase } = req.body;
  try {
    const result = await pool.query(
      'UPDATE TB_fase SET nome_fase = $1 WHERE id_fase = $2 RETURNING *',
      [nome_fase, req.params.id_fase]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Errore PUT fase' });
  }
});

router.delete('/:id_fase', async (req, res) => {
  try {
    await pool.query('DELETE FROM TB_fase WHERE id_fase = $1', [req.params.id_fase]);
    res.json({ message: 'Fase eliminata' });
  } catch (err) {
    res.status(500).json({ error: 'Errore DELETE fase' });
  }
});

module.exports = router;

