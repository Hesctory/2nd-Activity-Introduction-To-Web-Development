import { Router } from "express";
import { login, logout } from "../auth.js";

export const authRouter = Router();

// POST /api/login — exchange the admin password for a bearer token.
authRouter.post("/login", (req, res) => {
  const { password } = req.body;
  const token = login(password);
  if (!token) {
    return res.status(401).json({ error: "Senha incorreta." });
  }
  res.json({ token });
});

// POST /api/logout — invalidate the current token.
authRouter.post("/logout", (req, res) => {
  const header = req.headers.authorization || "";
  const [, token] = header.split(" ");
  if (token) {
    logout(token);
  }
  res.status(204).end();
});
