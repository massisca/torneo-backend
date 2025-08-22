const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM TB_punti');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Errore GET punti' });
  }
});

router.post('/', async (req, res) => {
  const {
    descrizione,
    punti_vittoria,
    punti_pareggio,
    punti_sconfitta,
    bonus_difensivo,
    punti_diff,
    bonus_offensivo,
    punti_fatti
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO TB_punti (
        descrizione, punti_vittoria, punti_pareggio, punti_sconfitta,
        bonus_difensivo, punti_diff, bonus_offensivo, punti_fatti
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [descrizione, punti_vittoria, punti_pareggio, punti_sconfitta, bonus_difensivo, punti_diff, bonus_offensivo, punti_fatti]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Errore POST punti' });
  }
});

router.put('/:id_punti', async (req, res) => {
  const {
    descrizione,
    punti_vittoria,
    punti_pareggio,
    punti_sconfitta,
    bonus_difensivo,
    punti_diff,
    bonus_offensivo,
    punti_fatti
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE TB_punti SET
        descrizione = $1, punti_vittoria = $2, punti_pareggio = $3, punti_sconfitta = $4,
        bonus_difensivo = $5, punti_diff = $6, bonus_offensivo = $7, punti_fatti = $8
      WHERE id_punti = $9 RETURNING *`,
      [descrizione, punti_vittoria, punti_pareggio, punti_sconfitta, bonus_difensivo, punti_diff, bonus_offensivo, punti_fatti, req.params.id_punti]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Errore PUT punti' });
  }
});

router.delete('/:id_punti', async (req, res) => {
  try {
    await pool.query('DELETE FROM TB_punti WHERE id_punti = $1', [req.params.id_punti]);
    res.json({ message: 'Punteggio eliminato' });
  } catch (err) {
    res.status(500).json({ error: 'Errore DELETE punti' });
  }
});

module.exports = router;

