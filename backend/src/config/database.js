const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DB_PATH || './database.sqlite';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err.message);
  } else {
    console.log('Połączono z bazą danych SQLite');
  }
});

// Włączenie foreign keys
db.run('PRAGMA foreign_keys = ON');

module.exports = db;
