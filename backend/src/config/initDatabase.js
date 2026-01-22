const db = require('./database');

// Inicjalizacja tabel w bazie danych
const initDatabase = () => {
  // Tabela użytkowników
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Błąd tworzenia tabeli users:', err.message);
    } else {
      console.log('Tabela users gotowa');
    }
  });

  // Tabela kont pocztowych
  db.run(`
    CREATE TABLE IF NOT EXISTS email_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      email VARCHAR(255) NOT NULL,
      provider VARCHAR(50),
      imap_host VARCHAR(255) NOT NULL,
      imap_port INTEGER NOT NULL,
      smtp_host VARCHAR(255) NOT NULL,
      smtp_port INTEGER NOT NULL,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      use_tls BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('Błąd tworzenia tabeli email_accounts:', err.message);
    } else {
      console.log('Tabela email_accounts gotowa');
    }
  });

  // Tabela folderów (cache)
  db.run(`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL,
      path VARCHAR(255) NOT NULL,
      FOREIGN KEY (account_id) REFERENCES email_accounts(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('Błąd tworzenia tabeli folders:', err.message);
    } else {
      console.log('Tabela folders gotowa');
    }
  });

  // Tabela etykiet
  db.run(`
    CREATE TABLE IF NOT EXISTS labels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name VARCHAR(100) NOT NULL,
      color VARCHAR(20) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, name)
    )
  `, (err) => {
    if (err) {
      console.error('Błąd tworzenia tabeli labels:', err.message);
    } else {
      console.log('Tabela labels gotowa');
    }
  });

  // Tabela powiązań email-etykieta
  db.run(`
    CREATE TABLE IF NOT EXISTS email_labels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      account_id INTEGER NOT NULL,
      email_uid VARCHAR(50) NOT NULL,
      label_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (account_id) REFERENCES email_accounts(id) ON DELETE CASCADE,
      FOREIGN KEY (label_id) REFERENCES labels(id) ON DELETE CASCADE,
      UNIQUE(account_id, email_uid, label_id)
    )
  `, (err) => {
    if (err) {
      console.error('Błąd tworzenia tabeli email_labels:', err.message);
    } else {
      console.log('Tabela email_labels gotowa');
    }
  });
};

// Uruchom inicjalizację
initDatabase();

// Zamknij połączenie po inicjalizacji
setTimeout(() => {
  db.close((err) => {
    if (err) {
      console.error('Błąd zamykania bazy danych:', err.message);
    } else {
      console.log('Baza danych została zainicjalizowana i zamknięta');
    }
  });
}, 1000);
