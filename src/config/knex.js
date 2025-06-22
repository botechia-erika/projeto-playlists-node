
import dotenv from "dotenv";
dotenv.config();
import knex from "knex";
export const db = knex({
  client: "sqlite3",
  connection: {
    filename: process.env.DB_FILE_PATH || "src/database/database.db",
  },
  useNullAsDefault: true,
  pool: {
    min: 0,
    max: 1,
    // ativando o check de constraint das chaves estrangeiras
    afterCreate: (conn, cb) => {
      conn.run("PRAGMA foreign_keys = ON", cb);
    },
  },
});
