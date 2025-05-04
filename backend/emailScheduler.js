import cron from 'node-cron';
import nodemailer from 'nodemailer';
import Problem from './models/problemModel.js';
import dotenv from 'dotenv';

dotenv.config();

// email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,    
    pass: process.env.password,   
  },
});

// return "YYYY-MM-DD"
const formatDate = (date) => date.toISOString().split('T')[0];

// CRON: 12:00 AM
cron.schedule('01 00 * * *', async () => {
  try {
    const today = new Date();

    // Get dates 3, 5, and 7 days ago
    const daysAgo = [3, 5, 7].map(days => {
      const d = new Date(today);
      d.setDate(d.getDate() - days);
      return formatDate(d);
    });

    // Get problems matching those dates
    const problems = await Problem.find();
    const emailMap = {};

    problems.forEach(problem => {
      const addedDate = formatDate(new Date(problem.addedDate));
      if (daysAgo.includes(addedDate)) {
        if (!emailMap[problem.email]) emailMap[problem.email] = [];
        emailMap[problem.email].push(`${problem.title} - ${problem.url}`);
      }
    });

    // Send emails
    for (const [email, problemList] of Object.entries(emailMap)) {
      const message = `
        <h3>⏰ LeetRepeat Reminder</h3>
        <p>Hey! LeetRepeater, Here are your problems to revise today:</p>
        <ul>
          ${problemList.map(p => `<li>${p}</li>`).join('')}
        </ul>
      `;

      await transporter.sendMail({
        from: `"LeetRepeat" <${process.env.email}>`,
        to: email,
        subject: `⏰LeetRepeat reminder!,Geared up to revise today ?- ${new Date().toLocaleDateString()}`,
        html: message,
      });

      console.log(`Email sent to ${email}`);
    }

  } catch (err) {
    console.error('Cron job error:', err);
  }
});
