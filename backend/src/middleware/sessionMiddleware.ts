import { RedisClientType } from "@redis/client";
import RedisStore from "connect-redis";
import session from "express-session";

let redisStore: RedisStore;

export function setupSessions(client: RedisClientType) {
  redisStore = new RedisStore({
    client: client,
    prefix: "tictac:",
  });
  return getSessionMiddleware();
}

export function getSessionMiddleware() {
  return session({
    store: redisStore,
    secret: "tic-tac-toe-cookie",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  });
}
