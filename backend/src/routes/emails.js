const express = require('express');
const router = express.Router();
const multer = require('multer');
const emailController = require('../controllers/emailController');
const authMiddleware = require('../middleware/auth');

// Konfiguracja multer dla uploadu załączników
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limit 10MB na plik
});

router.use(authMiddleware);

// Ważne: bardziej specyficzne ścieżki MUSZĄ być przed ogólnymi
router.get('/all/combined', emailController.getAllEmailsFromAllAccounts);
router.post('/send', upload.array('attachments', 5), emailController.sendEmail); // Maksymalnie 5 załączników

// Operacje na emailach - MUSZĄ być przed GET /:accountId/:emailId
router.post('/:accountId/:emailId/flag', emailController.toggleImportant);
router.post('/:accountId/:emailId/read', emailController.markAsRead);
router.post('/:accountId/:emailId/trash', emailController.moveToTrash);

// Ogólne endpointy
router.get('/:accountId/folders', emailController.listFolders);
router.delete('/:accountId/trash/empty', emailController.emptyTrash);
router.get('/:accountId', emailController.getEmails);
router.get('/:accountId/:emailId', emailController.getEmailById);
router.delete('/:accountId/:emailId', emailController.deleteEmail);

module.exports = router;
