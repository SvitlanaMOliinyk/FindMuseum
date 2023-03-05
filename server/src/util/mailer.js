import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import { logError, logInfo } from "./logging.js";

export const sendMail = async (firstName, email) => {
  const randomCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Offer winner",
      html: `
    <h1>Hello dear ${firstName}</h1>
    <p>Congratulations! Your offer code is ${randomCode}!</p>
    <p>Have a nice time and do not forget to share your impressions with us.</p>
    <p>Sincerely, Find Museum team</p>
    `,
    });
    logInfo(info.messageId);
  } catch (error) {
    logError(error.message);
  }
};
