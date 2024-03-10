import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";
dotenv.config();

const checkAdmin = async (email) => {
  try {
    const adminAcc = await Admin.findOne({ email: email });
    if (adminAcc) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
 
export const initAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const adminExist = await checkAdmin(email);
    if (!adminExist) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newAdmin = new Admin({ email, password: hashedPassword });
      await newAdmin.save();
      console.log("Admin account created");
    }
  } catch (error) {
    console.log(error);
  }
};
