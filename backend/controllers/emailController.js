import nodemailer from 'nodemailer';
import Problem from '../models/problemModel.js';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});


const formatDate = (date) => date.toISOString().split('T')[0];

export const sendReminderEmails = async (req,res) => {
  try {
    const today = new Date();
    const daysAgo = [3, 5, 7].map(days => {
      const d = new Date(today);
      d.setDate(d.getDate() - days);
      return formatDate(d);
    });

    const problems = await Problem.find();
    const emailMap = {};

    problems.forEach(problem => {
      const addedDate = formatDate(new Date(problem.addedDate));
      if (daysAgo.includes(addedDate)) {
        if (!emailMap[problem.email]) emailMap[problem.email] = [];
        emailMap[problem.email].push(`${problem.title} - ${problem.url}`);
      }
    });

    
    for (const [email, problemList] of Object.entries(emailMap)) {
      const message = `
        <h3>⏰ LeetRepeat Reminder</h3>
        <p>Hey! LeetRepeater, Here are your problems to revise today:</p>
        <ul>${problemList.map(p => `<li>${p}</li>`).join('')}</ul>
      `;

      await transporter.sendMail({
        from: `"LeetRepeat" <${process.env.email}>`,
        to: email,
        subject: `⏰LeetRepeat reminder! Ready to revise? - ${new Date().toLocaleDateString()}`,
        html: message,
      });
      console.log(`Email sent to ${email}`);
      res.status(200).send({
      success:true,
    });
    }
  } catch (err) {
    console.error('Reminder email error:', err);
    res.status(500).send({
      success:false,
    });
  }
};
