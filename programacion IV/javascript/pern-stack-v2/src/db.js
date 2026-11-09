import pg from "pg";

export const pool = new pg.Pool({
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "esteban23",
    database: "PERN"
});

pool.on("connect", () => {
    console.log("conectado a la base de datos");
});
