const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
  async register(req, res) {
    try {
      const { username, password, name } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Nazwa użytkownika i hasło są wymagane' });
      }

      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Użytkownik o tej nazwie już istnieje' });
      }

      const user = await User.create(username, password, name);

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Użytkownik został utworzony',
        token,
        user: { id: user.id, username: user.username, name: user.name }
      });
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Nazwa użytkownika i hasło są wymagane' });
      }

      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Nieprawidłowa nazwa użytkownika lub hasło' });
      }

      const isValidPassword = await User.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Nieprawidłowa nazwa użytkownika lub hasło' });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Zalogowano pomyślnie',
        token,
        user: { id: user.id, username: user.email, name: user.name }
      });
    } catch (error) {
      console.error('Błąd logowania:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Błąd pobierania profilu:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  }
};

module.exports = authController;
