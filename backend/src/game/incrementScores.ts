import { sequelize } from "@/models/sequelizeConfig";

export type Score = "pvp_L" | "pvp_W" | "bot_L" | "bot_W";

export async function incrementScore(username: string, score: Score) {
  await sequelize.query(
    "UPDATE Users SET " +
      score +
      "=  " +
      score +
      ' + 1 WHERE username = "' +
      username +
      '";'
  );
}
