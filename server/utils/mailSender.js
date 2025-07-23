const fetch = require('node-fetch');
require('dotenv').config();

const mailSender = async (email, title, message, name) => {
  try {
    const time = new Date().toLocaleString();

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'origin': 'http://localhost', // Required by EmailJS
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_u4tc8f3',
        template_id: 'template_kc0b1s9',
        user_id: process.env.EMAILJS_PUBLIC_KEY || 'QsZmsEjTeyX5b_Db9',
        template_params: {
          email: email,
          title: title,
          message: message,
          name: name,
          time: time,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`EmailJS Error: ${errorText}`);
    }

    const text = await response.text();
    console.log('✅ Email sent:', text);
    return text;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return error.message;
  }
};

module.exports = mailSender;
