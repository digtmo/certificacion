import { pool } from "../Conexion/conexion.js"

async function obtenerUsuarios() {
  try {
    const resultado = await pool.query("SELECT * FROM usuario");
    console.log("console.log", resultado.rows)
    return resultado.rows;
  } catch (error) {
    throw error;
  }
}

async function obtenerTransferenciasId(emisor) {
  try {
    const resultado = await pool.query(`
      SELECT transferencia.*, usuario.nombre as nombre_receptor
      FROM transferencia
      INNER JOIN usuario ON usuario.id = transferencia.receptor
      WHERE transferencia.emisor = $1
  `, [emisor]);

    console.log("console.log", resultado.rows);

    return resultado.rows;
  } catch (error) {
    throw error;
  }
}

async function crearTransferencias(emisor, receptor, monto, comentario) {
  try {
    // Obtener el saldo del emisor y el receptor
    const saldoEmisor = await obtenerSaldoUsuario(emisor);

    // Verificar si el saldo del emisor es suficiente para la transferencia
    if (saldoEmisor >= monto) {
      // Realizar la transferencia
      await pool.query("BEGIN"); // Iniciar una transacción
      await pool.query("INSERT INTO transferencia (emisor, receptor, monto, comentario) VALUES ($1, $2, $3, $4)", [emisor, receptor, monto, comentario]);
      await pool.query("UPDATE usuario SET saldo = saldo - $1 WHERE id = $2", [monto, emisor]);
      await pool.query("UPDATE usuario SET saldo = saldo + $1 WHERE id = $2", [monto, receptor]);
      await pool.query("COMMIT"); // Confirmar la transacción
      return true; // La transferencia se realizó con éxito
    } else {
      return false; // El saldo del emisor no es suficiente
    }
  } catch (error) {
    await pool.query("ROLLBACK"); // Revertir la transacción en caso de error
    throw error;
  }
}

async function obtenerusuarioId(id) {
  try {
    const resultado = await pool.query("SELECT id, nombre, correo, rut, direccion FROM usuario WHERE id = $1", [id]);
    console.log("console.log", resultado.rows)
    return resultado.rows.length > 0 ? resultado.rows : null;
  } catch (error) {
    throw error;
  }
}

async function crearUsuario(nombre, correo, password, rut, direccion, saldo) {
  try {
    const resultado = await pool.query("insert into usuario (nombre, correo, password, rut, direccion, saldo) values ($1, $2, $3, $4, $5, $6) RETURNING id, rut", [nombre, correo, password, rut, direccion, saldo]);
    console.log("console.log", resultado.rows)
    return true
  } catch (error) {
    return false
  }
}

async function editarUsuario(id, nombre, correo, rut, direccion) {
  try {
    const resultado = await pool.query("UPDATE usuario SET nombre = $2, correo = $3, rut = $4, direccion = $5 WHERE id = $1 RETURNING id, nombre, correo, rut, direccion, saldo", [id, nombre, correo, rut, direccion]);
    console.log("console.log", resultado.rows);
    return resultado.rowCount;
  } catch (error) {
    throw error;
  }
}

async function eliminarUsuario(id) {
  try {
    const resultado = await pool.query("delete from usuario WHERE id = $1", [id]);
    console.log("console.log", resultado.rows)
    return resultado.rowCount
  } catch (error) {
    throw error;
  }
}

async function obtenerSaldoUsuario(id) {
  try {
    const resultado = await pool.query("SELECT saldo FROM usuario WHERE id = $1", [id]);
    return resultado.rows[0].saldo;
  } catch (error) {
    throw error;
  }
}

async function login(rut, password) {
  try {
    const resultado = await pool.query("SELECT id, rut from usuario WHERE rut = $1 and password = $2", [rut, password])
    console.log(resultado.rows)
    return resultado.rows
  } catch (error) {
    console.log(error)
  }
}


export { login, obtenerusuarioId, obtenerTransferenciasId, crearUsuario, editarUsuario, eliminarUsuario, crearTransferencias, obtenerUsuarios }



