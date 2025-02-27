const nodemailer = require("nodemailer");
require('dotenv').config(); 

exports.sendPasswordResetNodeMailer = async (email, verificationCode) => {

  try {
    console.log("🚀 Sending email to:", email);
    const transporter = nodemailer.createTransport({
      service: "gmail", // can be replaced with any email service provider
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD, 
      },
    });
  
    const mailOptions = {
      from: process.env.GMAIL_USERNAME, // replace with your email
      to: email,
      subject: "FilmConnect Password reset",
      // text: ``, // replace with your message
      html: `
      <h1> Password Reset Code</h1>
      <p>You have requested to reset your password. Please use the following verification code to reset your password:</p>
      <h2 style="text-align: center; background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${verificationCode}</h2>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `,
    };
  
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
    
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
    
  }
 
};