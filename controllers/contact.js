import { sendMail } from "../utils/mail.js";

export const contact = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    await sendMail(email, subject, message);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending email" });
  }
};
