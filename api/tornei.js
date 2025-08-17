const express = require('express');
const router = express.Router();
const pool = require('../db');

// Tornei attivi (stato = 'in corso')


router.get('/tornei-attivi', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT nome_torneo, luogo FROM TB_torneo WHERE stato = 'in corso'"
    );

    if (result.rows.length === 0) {
      res.status(200).json({ message: 'Nessun torneo attivo trovato.' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error('🛑 Errore nel recupero tornei:', err.stack);
    res.status(500).json({ error: 'Errore del server' });
  }
});

module.exports = router;
