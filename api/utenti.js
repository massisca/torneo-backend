const express = require('express');
const router = express.Router();
const pool = require('../db');

// Visualizza tutti gli utenti (solo per test/debug)
router.get('/utenti', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_utenti, nome, email, cod_ruolo FROM TB_utenti"
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Errore nel recupero utenti:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

module.exports = router;
