import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import pokemonData from "../data/pokemon.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(pokemonData);
});

router.get("/:pokemonId", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public/pokemon.html"));
});

export default router;
