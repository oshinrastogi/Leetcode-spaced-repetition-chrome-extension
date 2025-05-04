# LeetRepeat - A LeetCode Spaced Repetition Extension

**LeetRepeat** is a Chrome extension that helps users retain programming concepts and improve problem-solving skills using the **3-5-7 spaced repetition method**. It allows users to track the LeetCode problems they solve and reminds them to revise selected problems after 3, 5, and 7 days via email.

---

## ✨ Features

- 🧠 Add solved LeetCode problems to a personalized tracker.
- 🔁 Reminders sent via email on a 3-5-7 day spaced schedule.
- 📬 Simple, clean UI integrated directly into LeetCode's problem page.
- 📅 Cron-based backend scheduler using Node.js and Nodemailer.
- 🧾 Persistent user tracking using local Chrome storage.

---

## 🔧 Tech Stack

### Frontend (Chrome Extension)
- JavaScript (Vanilla)
- DOM manipulation
- Chrome Extension APIs

### Backend
- Node.js & Express.js
- MongoDB (Mongoose)
- Nodemailer (email service)
- node-cron (scheduler)

---

## 📦 Installation

### 1. Clone this repository
```bash
git clone https://github.com/oshinrastogi/leetrepeat.git
cd leetrepeat
```

## 🛡️ Permissions
 - This extension only interacts with LeetCode pages and uses chrome.storage.local to store user emails locally. No external data is collected.


