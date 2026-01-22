const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [username, hashedPassword, name || username],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, username, name: name || username });
          }
        }
      );
    });
  }

  static async findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [username],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  static async findByEmail(email) {
    return this.findByUsername(email);
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT id, email, name, created_at FROM users WHERE id = ?',
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
