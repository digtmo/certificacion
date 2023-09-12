import { pool } from "../Conexion/conexion.js"

async function obtenerRegistros() {
  try {
    const resultado = await pool.query("SELECT * FROM usuarios");
    console.log("console.log",resultado.rows)
    return resultado.rows;
  } catch (error) {
    throw error;
  }
}

async function obtenerRegistrosId(id) {
    try {
        const resultado = await pool.query("SELECT id, usuario, password, rol FROM usuarios WHERE id = $1", [id]);
        console.log("console.log",resultado.rows)
        return resultado.rows;
    } catch (error) {
        throw error; 
    }
}

async function crearRegistro (usuario, password, rol){
    try {
        const resultado = await pool.query("insert into usuarios (usuario, password, rol) values ($1, $2, $3) RETURNING id, usuario, password, rol",[usuario, password, rol]); 
        console.log("console.log",resultado.rows)
        return resultado.rows; 
    } catch (error) {
        throw error;
    }
}


async function editarRegistro (id,usuario, password, rol){
    try {
        const resultado = await pool.query("update usuarios SET usuario = $2, password = $3,  rol = $4 WHERE id = $1   RETURNING id, usuario, password, rol",[id, usuario, password, rol]); 
        console.log("console.log",resultado.rows)
        return resultado.rows; 
    } catch (error) {
        throw error;
    }
}


async function eliminarRegistro(id){
    try {
        const resultado = await pool.query("delete from usuarios WHERE id = $1",[id]); 
        console.log("console.log",resultado.rows)
        return resultado.rowCount
    } catch (error) {
        throw error;
    }
}

async function login (usuario,password){
    try {
        const resultado = await pool.query("SELECT rol, id from usuarios WHERE usuario = $1 and password = $2",[usuario, password])
        console.log(resultado.rows)
        return resultado.rows
    } catch (error) {
        console.log(error)
    }
}

export {login, obtenerRegistros}



