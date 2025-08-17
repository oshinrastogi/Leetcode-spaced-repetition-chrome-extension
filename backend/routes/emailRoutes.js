import express from 'express'
import { mailSender } from '../controllers/sendEmailController.js';
import { sendReminderEmails } from '../controllers/emailController.js';
const router = express.Router();

// routes
//send-email
router.get('/send-email',sendReminderEmails);

// router.get('/send-email',mailSender);

export default router;

