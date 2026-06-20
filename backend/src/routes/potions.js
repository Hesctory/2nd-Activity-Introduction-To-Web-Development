import { Router } from "express";
import { Potion } from "../models/Potion.js";
import { requireAdmin } from "../auth.js";

export const potionsRouter = Router();

// GET /api/potions — list every potion. Public: anyone can browse the shop.
potionsRouter.get("/", async (req, res) => {
  const potions = await Potion.findAll({ order: [["id", "ASC"]] });
  res.json(potions);
});

// POST /api/potions — register a new potion. Admin only.
potionsRouter.post("/", requireAdmin, async (req, res) => {
  const { name, description, image, price } = req.body;

  if (!name || !description || !image || price === undefined || price === null) {
    return res
      .status(400)
      .json({ error: "Todos os campos são obrigatórios: nome, descrição, imagem e preço." });
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ error: "O preço deve ser um número maior ou igual a zero." });
  }

  const potion = await Potion.create({
    name,
    description,
    image,
    price: numericPrice,
  });
  res.status(201).json(potion);
});

// DELETE /api/potions/:id — remove a potion. Admin only.
potionsRouter.delete("/:id", requireAdmin, async (req, res) => {
  const deleted = await Potion.destroy({ where: { id: req.params.id } });
  if (deleted === 0) {
    return res.status(404).json({ error: "Poção não encontrada." });
  }
  res.status(204).end();
});
