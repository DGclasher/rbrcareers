import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: "Unauthorized!" });
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Unauthorized!" });
    if (decoded.type === "admin") next();
    else return res.status(401).json({ message: "Unauthorized!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
