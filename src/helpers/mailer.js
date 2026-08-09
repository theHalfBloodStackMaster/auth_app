import nodemailer from "nodemailer";
import User from "@/models/user.model.js";
import bcrypt from "bcryptjs";

const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // update token
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    // create mail object
    const mailOptions = {
      from: "halfbloodprince@yopmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "reset-password"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} <br/> or copy paste below link in your browser: <br/> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "reset-password"}?token=${hashedToken}</p>`,
    };

    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { sendEmail };
