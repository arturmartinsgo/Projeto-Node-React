import express from "express";
import usuariosRoutes from "./routes/usuarios.js";
import cors from "cors";
//Para utilizar o modo json para alterações como
// Post e Put
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", usuariosRoutes);
//Escutar a porta 8800
app.listen(8800);
