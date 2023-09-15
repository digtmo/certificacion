import express from "express"
import jwt from "jsonwebtoken"
import hbs from "hbs";
import { login, obtenerusuarioId, crearUsuario, editarUsuario, eliminarUsuario, obtenerTransferenciasId, crearTransferencias, obtenerUsuarios } from "./Funciones/Funciones.js"
import { verificarToken } from "./Funciones/Verificacion.js"
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT
const app = express()
const secret = process.env.SECRET
app.use(express.static("public"))
app.use(express.json())
app.set('view engine', 'hbs');

app.get("/", (req,res)=>{
  res.render("index")
});

app.get("/transferencia", (req,res)=>{
  res.render("formtransferencia")
});

app.get("/registro", (req,res)=>{
  res.render("registro")
});

app.get("/perfil", (req,res)=>{
  res.render("perfil")
});

app.get("/listatransferencias", (req,res)=>{
  res.render("listatransferencias")
});

app.post("/v1/login/", async (req, res) => {
  const { rut, password } = req.body;
  try {
    const resultado = await login(rut, password);
    if (resultado.length > 0) {
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

app.post("/v1/usuario/", async (req, res) => {
  const { nombre, correo, password, rut, direccion} = req.body;
  let saldo = 100000
  try {
    const resultado = await crearUsuario(nombre, correo, password, rut, direccion, saldo);
    if (resultado) {
      res.status(200).send({ mensaje: "Usuario creado con exito!" });
    } else {
      res.status(400).send({ mensaje: "Error al crear el usuario" });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).send({ mensaje: "Error de servidor" });
  }
});

app.put("/v1/usuario/", verificarToken, async (req, res) => {
  const id = req.id;
  const { nombre, correo, rut, direccion } = req.body;
  try {
    const resultado = await editarUsuario(id, nombre, correo, rut, direccion);
    if (resultado > 0) {
      res.status(200).send({ mensaje: "Usuario editado con éxito!" });
    } else {
      res.status(400).send({ mensaje: "Error al editar el usuario" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ mensaje: "Error de servidor" });
  }
});

app.get("/v1/usuario/", verificarToken, async (req, res) => {
  const id = req.id;
  try {
    const resultado = await obtenerusuarioId(id);
    if (resultado !== null) {
      res.status(200).json(resultado);
    } else {
      res.status(404).send({ mensaje: "El usuario no existe" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ mensaje: "Error de servidor" });
  }
});

app.delete("/v1/usuario/", verificarToken, async (req, res) => {
  const id  = req.id;
  try {
    const resultado = await eliminarUsuario(id);
    if (resultado > 0) {
      res.status(200).send({ mensaje: "Usuario eliminado con éxito junto a sus transferencias!!" });
    } else {
      res.status(400).send({ mensaje: "Error al eliminar el usuario" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ mensaje: "Error de servidor" });
  }
});

app.post("/v1/transferencia/",verificarToken, async (req, res) => {
  const emisor = req.id;
  const { receptor, monto, comentario} = req.body;
  try {
    const resultado = await crearTransferencias(emisor, receptor, monto, comentario);
    if (resultado) {
      res.status(200).send({ mensaje: "Transferencia creada con exito!" });
    } else {
      res.status(400).send({ mensaje: "Error al crear la transferencia!" });
    } 
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/v1/transferencia/", verificarToken, async (req, res) => {
  const id  = req.id
  try {
    const resultado = await obtenerTransferenciasId(id);
    if (resultado.length > 0) { // Cambiado de resultado > 0 a resultado.length > 0
      res.status(200).json(resultado)
    } else {
      res.status(400).send({ mensaje: "Usuario sin transferencias!" });
    } 
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/v1/obtenerusuarios/", verificarToken, async (req, res) => {
  try {
    const resultado = await obtenerUsuarios();
    res.status(200).json(resultado)
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.use('*',(req,res)=>{
  res.send("ruta no existe")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });