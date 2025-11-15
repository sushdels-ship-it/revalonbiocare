const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (the static site) from repository root
app.use(express.static(path.join(__dirname, '/')));

app.post('/api/send-email', async (req, res) => {
  const { name, email, message, smtpUsername, smtpPassword } = req.body;

  const user = smtpUsername || process.env.SMTP_USERNAME;
  const pass = smtpPassword || process.env.SMTP_PASSWORD;
  const to = process.env.TO_EMAIL || user;

  if (!user || !pass) {
    return res.status(400).json({ error: 'SMTP credentials not configured. Provide smtpUsername/smtpPassword in request or set SMTP_USERNAME and SMTP_PASSWORD environment variables.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass }
  });

  const mailOptions = {
    from: user,
    to,
    subject: `New message from ${name}`,
    html: `Name: ${name} <br> Email: ${email} <br> Message: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ ok: true });
  } catch (err) {
    console.error('sendMail error', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
