
import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import authorizeRole from "../middleware/authorize.js";
import { readUsers } from "../utils/db.js";

const router = Router();

router.get(
  "/users",
  authenticate,
  authorizeRole("admin"),
  (req, res) => {
    const users = readUsers().map(({ passwordHash, ...user }) => user);

    return res.json({ users });
  }
);

export default router;
