const EmailAccount = require('../models/EmailAccount');

const accountController = {
  async getAccounts(req, res) {
    try {
      const accounts = await EmailAccount.findByUserId(req.userId);
      res.json({ accounts });
    } catch (error) {
      console.error('Błąd pobierania kont:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  },

  async createAccount(req, res) {
    try {
      const {
        email,
        provider,
        imapHost,
        imapPort,
        smtpHost,
        smtpPort,
        password,
        useTls
      } = req.body;

      if (!email || !imapHost || !imapPort || !smtpHost || !smtpPort || !password) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
      }

      const account = await EmailAccount.create(req.userId, {
        email,
        provider,
        imapHost,
        imapPort,
        smtpHost,
        smtpPort,
        username: email, // Użyj email jako username
        password,
        useTls
      });

      res.status(201).json({
        message: 'Konto pocztowe zostało dodane',
        account
      });
    } catch (error) {
      console.error('Błąd dodawania konta:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  },

  async updateAccount(req, res) {
    try {
      const { id } = req.params;
      const accountData = req.body;

      const result = await EmailAccount.update(id, req.userId, accountData);

      if (!result.updated) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      res.json({ message: 'Konto zostało zaktualizowane' });
    } catch (error) {
      console.error('Błąd aktualizacji konta:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  },

  async deleteAccount(req, res) {
    try {
      const { id } = req.params;

      const result = await EmailAccount.delete(id, req.userId);

      if (!result.deleted) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      res.json({ message: 'Konto zostało usunięte' });
    } catch (error) {
      console.error('Błąd usuwania konta:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  }
};

module.exports = accountController;
