import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123momiaes",
  database: "certificacion",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Conexión a la base de datos establecida con éxito");
});


pool.connect();

export { pool };
