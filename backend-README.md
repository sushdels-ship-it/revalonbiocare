# Backend for EtheaHeathcare (Email API)

This minimal backend provides an HTTP API for sending email from the contact form and serves the static site for local testing.

## Setup

Prerequisites: Node.js (14+ recommended) and npm.

1. Install dependencies:

```bash
npm install
```

2. Configure credentials (one of the two options):

- Preferred (safer): set environment variables before starting the server:

```bash
export SMTP_USERNAME="revelonbiocare@gmail.com"
export SMTP_PASSWORD="<your-gmail-app-password-here>"
export TO_EMAIL="revelonbiocare@gmail.com"  # optional
```

- Alternative (not recommended): include `smtpUsername` and `smtpPassword` in the POST body (the server accepts it, but this exposes credentials over the network).

3. Start the server:

```bash
npm start
```

4. Open the site in your browser:

```
http://localhost:3000/
```

## API

POST `/api/send-email` (JSON)

Body example:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "message": "Hello",
  "smtpUsername": "optional@example.com",    // optional
  "smtpPassword": "optional-password"       // optional
}
```

If `smtpUsername`/`smtpPassword` are not provided, the server uses `SMTP_USERNAME` and `SMTP_PASSWORD` environment variables.

## Security notes
- Do not commit live credentials into the repo.
- Prefer environment variables or a secrets manager.
- For production, use a dedicated transactional email service (SendGrid, SES) and secrets storage.
