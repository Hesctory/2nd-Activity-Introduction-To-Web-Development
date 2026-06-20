import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

import express from "express";
import cors from "cors";

import { sequelize } from "./database.js";
import { seedPotions } from "./seed.js";
import { potionsRouter } from "./routes/potions.js";
import { authRouter } from "./routes/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

// Web Service routes.
app.use("/api", authRouter);
app.use("/api/potions", potionsRouter);

// In production we serve the built React app (frontend/dist) from the same
// server, so the whole site runs on a single port. During development the
// React app runs on Vite's dev server and proxies /api here instead.
const frontendDist = path.resolve(__dirname, "../../frontend/dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // Any non-API route falls back to index.html for client-side routing.
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

async function start() {
  await sequelize.sync();
  await seedPotions();
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

start();
