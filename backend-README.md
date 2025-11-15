# Backend for EtheaHeathcare (Email API)

This minimal backend provides an HTTP API for sending email from the contact form and serves the static site for local testing.

## Quick Start (5 minutes)

Prerequisites: Node.js (14+ recommended) and npm.

### 1. Copy the environment template:
```bash
cp .env.example .env
```

### 2. Edit `.env` with your SMTP credentials:
For Gmail:
- Go to https://myaccount.google.com/security
- Enable 2-Step Verification (if not already enabled)
- Create App Password: Select "Mail" and "Windows Computer"
- Copy the 16-character password and paste into `.env`:

```bash
SMTP_USERNAME=revelonbiocare@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
TO_EMAIL=revelonbiocare@gmail.com
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Start the server:
```bash
npm start
```

Server runs on **http://localhost:3000/**

## How It Works

1. Static site (`index.html`, CSS, JS) served from `/`
2. Contact form POSTs to `/api/send-email`
3. Backend authenticates with SMTP and sends via Nodemailer
4. Credentials loaded from `.env` file (safe, not in code)

## API Reference

**POST `/api/send-email`**

Request body (JSON):
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "message": "Hello"
}
```

Response on success (HTTP 200):
```json
{ "ok": true }
```

Response on error (HTTP 400/500):
```json
{
  "error": "SMTP credentials not configured...",
  "details": "Optional: underlying error message"
}
```

## Configuration

All settings in `.env` (see `.env.example` for full list):

| Variable | Default | Description |
|----------|---------|-------------|
| `SMTP_USERNAME` | (required) | Email account username |
| `SMTP_PASSWORD` | (required) | Email account password or app password |
| `SMTP_HOST` | `smtp.gmail.com` | SMTP server hostname |
| `SMTP_PORT` | `587` | SMTP server port (587=TLS, 465=SSL) |
| `TO_EMAIL` | `SMTP_USERNAME` | Recipient email (who receives form submissions) |
| `PORT` | `3000` | Server port |

## Other Email Providers

**SendGrid:**
```env
SMTP_USERNAME=apikey
SMTP_PASSWORD=SG.xxxxx
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
```

**AWS SES:**
```env
SMTP_USERNAME=your-iam-user
SMTP_PASSWORD=your-iam-password
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
```

**Testing (Ethereal - no real emails):**
Use test account credentials from https://ethereal.email

## Security

- ✅ `.env` is in `.gitignore` — never committed to git
- ✅ Credentials not hardcoded in source
- ✅ Use App Passwords for Gmail (not regular password)
- ✅ For production: use SendGrid, SES, or similar with encrypted secrets storage
- ✅ Run behind HTTPS reverse proxy in production

## Troubleshooting

**"SMTP credentials not configured"** → Copy `.env.example` to `.env` and add credentials

**"Invalid login" (Gmail)** → Use Gmail App Password, not regular password (requires 2FA enabled)

**"Connection refused"** → Server not running; run `npm start`

**No error logs** → Check the terminal where `npm start` is running; detailed errors appear there

## Development

- **Watch mode** (auto-restart on changes): `npm install -g nodemon` then `nodemon server.js`
- **Test without real emails**: Use Ethereal test account (see `.env.example`)
- **View server logs**: All `console.error()` and `console.log()` output to the terminal running `npm start`
