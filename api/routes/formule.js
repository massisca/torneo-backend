const express = require('express');
const router = express.Router();
const pool = require('../../db');

// GET tutte le formule
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM TB_formula');
    res.json(result.rows);
  } catch (err) {
    console.error('Errore GET formule:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// POST nuova formula
router.post('/', async (req, res) => {
  const {
    nome,
    descrizione,
    gironi,
    squadre_per_girone,
    fase_finale,
    classifica_completa
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO TB_formula (
        nome, descrizione, gironi, squadre_per_girone, fase_finale, classifica_completa
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nome, descrizione, gironi, squadre_per_girone, fase_finale, classifica_completa]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Errore POST formula:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// PUT modifica formula
router.put('/:id_formula', async (req, res) => {
  const {
    nome,
    descrizione,
    gironi,
    squadre_per_girone,
    fase_finale,
    classifica_completa
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE TB_formula SET
        nome = $1,
        descrizione = $2,
        gironi = $3,
        squadre_per_girone = $4,
        fase_finale = $5,
        classifica_completa = $6
      WHERE id_formula = $7 RETURNING *`,
      [nome, descrizione, gironi, squadre_per_girone, fase_finale, classifica_completa, req.params.id_formula]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Errore PUT formula:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// DELETE formula
router.delete('/:id_formula', async (req, res) => {
  try {
    await pool.query('DELETE FROM TB_formula WHERE id_formula = $1', [req.params.id_formula]);
    res.json({ message: 'Formula eliminata' });
  } catch (err) {
    console.error('Errore DELETE formula:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

module.exports = router;

