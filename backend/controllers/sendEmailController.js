import { sendReminderEmails } from './emailController.js';

// This is the endpoint your cron job will hit
export const mailSender =   (req, res) => {
   sendReminderEmails()
    .then(() => console.log('Email job completed successfully.'))
    .catch(error => console.error('Email job failed:', error));

    // Immediately send a 202 Accepted response.
    res.status(202).json({ success: true, message: 'Email job has been queued and is processing.' });
};