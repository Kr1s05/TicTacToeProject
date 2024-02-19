import bcrypt from "bcryptjs";
import { Sequelize } from "sequelize-typescript";
import { config } from "@/config/config";
import { User } from "./User";

const configuration = config[process.env.CONFIG || "development"];

export const sequelize = new Sequelize({
  database: configuration.database,
  username: configuration.username,
  password: configuration.password,
  host: configuration.host,
  dialect: configuration.dialect,
});

sequelize.addModels([User]);

export const sync = () => {
  sequelize.sync({ force: true }).then(() => {
    User.create({
      username: "testUser",
      email: "testMail@mail.com",
      password: bcrypt.hashSync("testPass", 10),
    });
    User.create({
      username: "testUser2",
      email: "testMail2@mail.com",
      password: bcrypt.hashSync("testPass", 10),
    });
  });
};
