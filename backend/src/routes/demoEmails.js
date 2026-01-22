const express = require('express');
const router = express.Router();
const demoEmailController = require('../controllers/demoEmailController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/:accountId', demoEmailController.getEmails);
router.get('/:accountId/:emailId', demoEmailController.getEmailById);
router.post('/send', demoEmailController.sendEmail);
router.delete('/:accountId/:emailId', demoEmailController.deleteEmail);

module.exports = router;
