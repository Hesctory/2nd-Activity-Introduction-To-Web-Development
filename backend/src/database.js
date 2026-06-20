import { Sequelize } from "sequelize";

// Creates the connection to the in-memory SQLite database.
// Storage is ":memory:" as mandated by the statement, which means all data
// lives only while the process is running and is wiped on every restart.
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});
