import jwt from "jsonwebtoken"
const secret = "matrix"

const verificarTokenAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    }
  
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(403).json({ mensaje: "Token no válido" });
      }
  
      req.decoded = decoded;
      // Verifica si el rol es "admin"
      if (decoded[0].rol === 'admin') {     
        next();
      } else {
        return res.status(403).json({ mensaje: "Acceso no autorizado: No eres un administrador" });
      }
    });
  };
  
  
  const verificarTokenUser = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    }
  
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(403).json({ mensaje: "Token no válido" });
      }
  
      req.decoded = decoded;
      // Verifica si el rol es "admin"
      if (decoded[0].rol === 'user') {     
        next();
      } else {
        return res.status(403).json({ mensaje: "Acceso no autorizado: No eres un user" });
      }
    });
  };


  export { verificarTokenAdmin, verificarTokenUser }