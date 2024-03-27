import client from "./axiosClient";

export async function getPlayerBoard(): Promise<Array<UserScore>> {
  return client.get("/scoreboard/player").then(({ data }) => {
    if (data && data instanceof Array)
      return data.map((score) => {
        delete score.isActive;
        return score;
      });
    throw new Error("invalid scoreboard");
  });
}

export async function getBotBoard(): Promise<Array<UserScore>> {
  return client.get("/scoreboard/bot").then(({ data }) => {
    if (data && data instanceof Array)
      return data.map((score) => {
        delete score.isActive;
        return score;
      });
    throw new Error("invalid scoreboard");
  });
}

export type UserScore = {
  username: string;
  pvp_W: number;
  pvp_L: number;
};

export type BotScore = {
  username: string;
  bot_W: number;
  bot_L: number;
};
