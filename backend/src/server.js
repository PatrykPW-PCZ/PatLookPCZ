const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accounts');
const emailRoutes = require('./routes/emails');
const demoEmailRoutes = require('./routes/demoEmails');
const labelRoutes = require('./routes/labels');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/demo-emails', demoEmailRoutes);
app.use('/api/labels', labelRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PatLook API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Błąd serwera:', err);
  res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint nie znaleziony' });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
  console.log(`API dostępne pod adresem: http://localhost:${PORT}/api`);
});
