type dbConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
};

type Config = {
  production: dbConfig;
  development: dbConfig;
};

export const config: Config = {
  development: {
    username: "root",
    password: "qwerty",
    database: "tic-tac-toe",
    host: process.env.DBHOST || "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "appUser",
    password: "12345678",
    database: "tic-tac-toe",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
