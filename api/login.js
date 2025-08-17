const express = require('express');
const router = express.Router();
const pool = require('../db');
// const bcrypt = require('bcrypt');  

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
     const result = await pool.query(
     "SELECT cod_ruolo, nome, password_hash FROM TB_utenti WHERE email = $1",
       [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Utente non trovato' });
    }

    const { cod_ruolo, nome, password_hash } = result.rows[0];
   // const match = await bcrypt.compare(password, password_hash);

    //if (!match) {
    if (password !== password_hash) {
      return res.status(401).json({ message: 'password errata' });
    }

    res.json({ cod_ruolo, nome }); 
  } catch (err) {
    console.error('Errore login:', err);
    res.status(500).json({ message: 'Errore del server' });
  }
});

module.exports = router;

