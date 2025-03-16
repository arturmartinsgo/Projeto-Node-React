import express from "express";
import {
  getusuarios,
  addusuarios,
  updateusuarios,
  deleteusuarios,
  login // Importe a função de login
} from "../controllers/usuarios.js";

const router = express.Router();

router.get("/", getusuarios);
router.post("/", addusuarios); // Rota para adicionar um novo usuário
router.put("/:codigo", updateusuarios);
router.delete('/usuarios/:codigo', deleteusuarios);
router.post("/login", login);

export default router;
