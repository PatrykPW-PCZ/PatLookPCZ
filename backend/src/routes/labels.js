const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Zarządzanie etykietami
router.get('/', labelController.getLabels);
router.post('/', labelController.createLabel);
router.delete('/:labelId', labelController.deleteLabel);

// Przypisywanie etykiet do emaili
router.post('/email', labelController.addLabelToEmail);
router.delete('/email/:accountId/:emailUid/:labelId', labelController.removeLabelFromEmail);
router.get('/email/:accountId/:emailUid', labelController.getEmailLabels);

// Pobierz emaile z daną etykietą
router.get('/:labelId/emails', labelController.getEmailsByLabel);

module.exports = router;
