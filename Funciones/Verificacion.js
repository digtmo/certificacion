import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const secret = process.env.SECRET

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(403).json({ mensaje: "Token no válido" });
    }

  
    if (decoded) {

      req.id = decoded[0].id; // aca ocupo el id que tiene el token para enviarlo en todas las funciones que son necesarias

      next(); 
    } else {
      return res.status(403).json({ mensaje: "Acceso no autorizado" });
    }
  });
};

export { verificarToken };
