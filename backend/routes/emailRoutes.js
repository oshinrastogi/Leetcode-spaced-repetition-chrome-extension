import express from 'express'
import { sendReminderEmails } from '../controllers/emailController.js';

const router = express.Router();

// routes
//send-email
router.get('/send-email',sendReminderEmails);

export default router;

