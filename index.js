import express from "express"
import jwt from "jsonwebtoken"
import { login, obtenerRegistros } from "./Funciones/Funciones.js"
import { verificarTokenAdmin, verificarTokenUser } from "./Verificacion/Verificacion.js"

const port = 3000
const app = express()
const secret = "matrix"

app.use(express.json())


app.post("/v1/login/", async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const resultado = await login(usuario, password);
    if (resultado.length > 0) {
      // Convertir el objeto resultado a formato JSON
      const payload = JSON.stringify(resultado);

      const token = jwt.sign(payload, secret);
      res.status(200).send(token);
    } else {
      res.status(400).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.get("/v1/registros/", verificarTokenAdmin, async (req, res) => {
  try {
    const resultado = await obtenerRegistros();
    res.status(200).send(resultado)
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.get("/v1/registros2/", verificarTokenUser, async (req, res) => {
  try {
    const resultado = await obtenerRegistros();
    res.status(200).send(resultado)
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});




app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });