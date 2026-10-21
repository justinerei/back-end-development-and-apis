
import { Router } from "express";
import bcrypt from "bcrypt";
import { findByEmail, readUsers, writeUsers } from "../utils/db.js";
import { signToken } from "../utils/jwt.js";
import authenticate from "../middleware/authenticate.js";
import { blacklistToken } from "../utils/token-blacklist.js";


const router = Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  if (findByEmail(email)) {
    return res.status(409).json({
      message: "Email already in use",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const users = readUsers();

  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    email,
    passwordHash,
    role: "user",
  };

  users.push(newUser);
  writeUsers(users);

  const token = signToken({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });

  return res.status(201).json({ token });
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = findByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return res.status(200).json({ token });
});

router.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});


router.post("/logout", authenticate, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  blacklistToken(token);

  return res.json({ message: "Logged out successfully" });
});



export default router;
