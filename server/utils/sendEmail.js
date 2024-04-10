import nodemailer from "nodemailer";
import { smtpUserName, smtpPassword } from "../secret/secret.js";
// send verification emaul at  the time of account creation

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});

export const sendVerificationEmail = async (emailData) => {
  try {
    const info = await transporter.sendMail({
      from: smtpUserName, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    });

    console.log(info.response);
  } catch (error) {
    console.log("Error occured while sending mail", error);
    throw error;
  }
};
