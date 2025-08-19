const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // necessario per Render su PostgreSQL
  }
});

// Test rapido
pool.connect((err, client, release) => {
  if (err) {
    console.error('🛑 Errore di connessione al DB:', err.message);
  } else {
    console.log('✅ Connessione al database avvenuta con successo!');
    release();
  }
});

module.exports = pool;
