const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Route to handle sending emails
app.post('/api/send-mail', (req, res) => {
  const { name, email, modalMessage, selectedCheckboxes } = req.body;

  // Define recipients
  const recipients = ['lubhanm@proteantech.in', 
//   'subhadips@proteantech.in'
'jangir.ritik06@gmail.com'
];

  // Construct email message
  const message = {
    from: 'info-x@proteantech.in',
    to: recipients.join(', '),
    subject: 'Test Email',
    text: `
      Name: ${name}\n
      Email: ${email}\n
      Interested in: ${selectedCheckboxes.join(', ')}\n
      Message: ${modalMessage}
    `,
  };

  // Send email
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email.' });
    } else {
      console.log('Email sent:', info.messageId);
      res.status(200).json({ success: true, message: 'Email sent successfully.' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
