// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test rapido
pool.connect((err, client, release) => {
  if (err) {
    console.error('Errore di connessione al DB:', err.stack);
  } else {
    console.log('✅ Connessione al database avvenuta con successo!');
    release();
  }
});

module.exports = pool;
