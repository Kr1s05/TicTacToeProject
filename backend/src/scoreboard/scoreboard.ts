import { User } from "@/models/User";

export function getPlayerScoreBoard() {
  return User.findAll({
    attributes: ["username", "pvp_W", "pvp_L"],
    order: [
      ["pvp_W", "DESC"],
      ["pvp_L", "ASC"],
    ],
    limit: 20,
  });
}

export async function getBotScoreBoard() {
  return User.findAll({
    where: { isActive: true },
    attributes: ["username", "bot_W", "bot_L"],
    order: [
      ["bot_W", "DESC"],
      ["bot_L", "ASC"],
    ],
    limit: 20,
  });
}
