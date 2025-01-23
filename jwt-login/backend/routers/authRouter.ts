import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface user {
  username: string;
  email: string;
  hashPassword: string;
}

const authRouter = express.Router();

export const authSecretKey =
  "aB7x$9fJ4LwZpRt#CmY@3QkNvU6*2XoGd!V5EhPr&M8TuK1FzWcL#yJbQ9";

// For registration
authRouter.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Password must be above 8 characters
  const checkPsw = password.length >= 8;

  if (!checkPsw) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = { username, email, hashPassword };

  const doFileExist = fs.existsSync("user-list.json");

  if (!doFileExist) {
    fs.writeFileSync("user-list.json", JSON.stringify([newUser]));
    res.status(200).json({ message: "Registration successful!" });
  } else {
    // Read inner file content
    const existingUsers: user[] = JSON.parse(
      fs.readFileSync("user-list.json", "utf-8")
    );
    // Check if the user already exists
    const isNotValid = existingUsers.find((user) => user.email === email);

    if (isNotValid) {
      return res.status(400).json({ message: "User already exists!" });
    }

    existingUsers.push(newUser);
    fs.writeFileSync("user-list.json", JSON.stringify(existingUsers));
    res.status(200).json({ message: "Registration successful!" });
  }
});

// For login
authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check whether user is registered or not using fs.readFile
  fs.readFile("user-list.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }

    // Get every user from users.json through JSON parsing
    const users: user[] = JSON.parse(data);
    // Check if the user exists or not
    const existedUser = users.find((user) => user.email === email);

    if (!existedUser) {
      return res
        .status(400)
        .json({ message: "Account not found. Please sign up to continue." });
    } else {
      // compare passwords
      const isValidPassword = bcrypt.compareSync(
        password,
        existedUser.hashPassword
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid email or password." });
      } else {
        const token = jwt.sign({ email }, authSecretKey, { expiresIn: "1h" });
        return res
          .status(200)
          .json({ token, message: "You are logged in successfully!" });
      }
    }
  });
});

export default authRouter;
