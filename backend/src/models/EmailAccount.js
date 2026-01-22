const db = require('../config/database');
const crypto = require('crypto');

// Proste szyfrowanie hasła (w produkcji użyj lepszego rozwiązania)
const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.JWT_SECRET || 'secret', 'salt', 32);
const iv = Buffer.alloc(16, 0);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

class EmailAccount {
  static async create(userId, accountData) {
    const {
      email,
      provider,
      imapHost,
      imapPort,
      smtpHost,
      smtpPort,
      username,
      password,
      useTls
    } = accountData;

    const encryptedPassword = encrypt(password);

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO email_accounts
        (user_id, email, provider, imap_host, imap_port, smtp_host, smtp_port, username, password, use_tls)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, email, provider, imapHost, imapPort, smtpHost, smtpPort, username, encryptedPassword, useTls ? 1 : 0],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, email, provider });
          }
        }
      );
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT id, email, provider, imap_host, imap_port, smtp_host, smtp_port, username, use_tls, created_at FROM email_accounts WHERE user_id = ?',
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async findById(id, userId) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM email_accounts WHERE id = ? AND user_id = ?',
        [id, userId],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            // Only decrypt password if NOT a DEMO account
            if (row && row.password && row.provider !== 'DEMO') {
              row.password = decrypt(row.password);
            }
            resolve(row);
          }
        }
      );
    });
  }

  static async delete(id, userId) {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM email_accounts WHERE id = ? AND user_id = ?',
        [id, userId],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ deleted: this.changes > 0 });
          }
        }
      );
    });
  }

  static async update(id, userId, accountData) {
    const {
      email,
      provider,
      imapHost,
      imapPort,
      smtpHost,
      smtpPort,
      username,
      password,
      useTls
    } = accountData;

    const encryptedPassword = password ? encrypt(password) : null;

    return new Promise((resolve, reject) => {
      let query = `UPDATE email_accounts SET
        email = ?, provider = ?, imap_host = ?, imap_port = ?,
        smtp_host = ?, smtp_port = ?, username = ?, use_tls = ?`;

      let params = [email, provider, imapHost, imapPort, smtpHost, smtpPort, username, useTls ? 1 : 0];

      if (encryptedPassword) {
        query += ', password = ?';
        params.push(encryptedPassword);
      }

      query += ' WHERE id = ? AND user_id = ?';
      params.push(id, userId);

      db.run(query, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ updated: this.changes > 0 });
        }
      });
    });
  }
}

module.exports = EmailAccount;
