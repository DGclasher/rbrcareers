import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminAcc = await Admin.findOne({ email: email });
    if (!adminAcc) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }
    const validated = await bcrypt.compare(password, adminAcc.password);
    if (!validated) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }
    const token = jwt.sign(
      {
        id: adminAcc._id,
        type: "admin",
        email: adminAcc.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2w" }
    );
    return res
      .status(200)
      .json({ message: "Login Successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const adminAcc = await Admin.create({
      email: email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        id: adminAcc._id,
        type: "admin",
        email: adminAcc.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2w" }
    );
    return res
      .status(201)
      .json({ message: "Admin Created Successfully", token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
