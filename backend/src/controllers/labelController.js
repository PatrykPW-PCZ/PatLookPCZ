const db = require('../config/database');

// Pobierz wszystkie etykiety użytkownika
exports.getLabels = (req, res) => {
  const userId = req.userId;

  db.all(
    'SELECT * FROM labels WHERE user_id = ? ORDER BY name ASC',
    [userId],
    (err, labels) => {
      if (err) {
        console.error('Błąd pobierania etykiet:', err);
        return res.status(500).json({ error: 'Błąd serwera' });
      }
      res.json({ labels });
    }
  );
};

// Utwórz nową etykietę
exports.createLabel = (req, res) => {
  const userId = req.userId;
  const { name, color } = req.body;

  if (!name || !color) {
    return res.status(400).json({ error: 'Nazwa i kolor są wymagane' });
  }

  db.run(
    'INSERT INTO labels (user_id, name, color) VALUES (?, ?, ?)',
    [userId, name, color],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Etykieta o tej nazwie już istnieje' });
        }
        console.error('Błąd tworzenia etykiety:', err);
        return res.status(500).json({ error: 'Błąd serwera' });
      }

      res.json({
        id: this.lastID,
        user_id: userId,
        name,
        color
      });
    }
  );
};

// Usuń etykietę
exports.deleteLabel = (req, res) => {
  const userId = req.userId;
  const { labelId } = req.params;

  db.run(
    'DELETE FROM labels WHERE id = ? AND user_id = ?',
    [labelId, userId],
    function(err) {
      if (err) {
        console.error('Błąd usuwania etykiety:', err);
        return res.status(500).json({ error: 'Błąd serwera' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Etykieta nie znaleziona' });
      }

      res.json({ message: 'Etykieta usunięta' });
    }
  );
};

// Przypisz etykietę do emaila
exports.addLabelToEmail = (req, res) => {
  const userId = req.userId;
  const { accountId, emailUid, labelId } = req.body;

  if (!accountId || !emailUid || !labelId) {
    return res.status(400).json({ error: 'accountId, emailUid i labelId są wymagane' });
  }

  db.run(
    'INSERT INTO email_labels (user_id, account_id, email_uid, label_id) VALUES (?, ?, ?, ?)',
    [userId, accountId, emailUid, labelId],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Ta etykieta jest już przypisana do tego emaila' });
        }
        console.error('Błąd dodawania etykiety do emaila:', err);
        return res.status(500).json({ error: 'Błąd serwera' });
      }

      res.json({ message: 'Etykieta dodana do emaila', id: this.lastID });
    }
  );
};

// Usuń etykietę z emaila
exports.removeLabelFromEmail = (req, res) => {
  const userId = req.userId;
  const { accountId, emailUid, labelId } = req.params;

  db.run(
    'DELETE FROM email_labels WHERE user_id = ? AND account_id = ? AND email_uid = ? AND label_id = ?',
    [userId, accountId, emailUid, labelId],
    function(err) {
      if (err) {
        console.error('Błąd usuwania etykiety z emaila:', err);
        return res.status(500).json({ error: 'Błąd serwera' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Powiązanie nie znalezione' });
      }

      res.json({ message: 'Etykieta usunięta z emaila' });
    }
  );
};

// Pobierz etykiety dla konkretnego emaila
exports.getEmailLabels = (req, res) => {
  const userId = req.userId;
  const { accountId, emailUid } = req.params;

  db.all(
    `SELECT l.* FROM labels l
     INNER JOIN email_labels el ON l.id = el.label_id
     WHERE el.user_id = ? AND el.account_id = ? AND el.email_uid = ?`,
    [userId, accountId, emailUid],
    (err, labels) => {
      if (err) {
        console.error('Błąd pobierania etykiet emaila:', err);
        return res.status(500).json({ error: 'Błąd serwera' });
      }
      res.json({ labels });
    }
  );
};

// Pobierz wszystkie emaile z daną etykietą
exports.getEmailsByLabel = (req, res) => {
  const userId = req.userId;
  const { labelId } = req.params;

  db.all(
    `SELECT el.account_id, el.email_uid FROM email_labels el
     WHERE el.user_id = ? AND el.label_id = ?`,
    [userId, labelId],
    (err, emails) => {
      if (err) {
        console.error('Błąd pobierania emaili z etykietą:', err);
        return res.status(500).json({ error: 'Błąd serwera' });
      }
      res.json({ emails });
    }
  );
};
