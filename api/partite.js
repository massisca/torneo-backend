const express = require('express');
const router = express.Router();
const pool = require('../db');

// Partite in programma (esempio: partite future)
router.get('/partite-in-programma', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_partita, squadra_A, squadra_B, orario, id_campo FROM TB_partita WHERE orario > NOW() ORDER BY orario ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Errore nel recupero partite:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

module.exports = router;
