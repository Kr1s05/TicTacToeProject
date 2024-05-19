import { Request, Response, Router } from "express";
import { getBotScoreBoard, getPlayerScoreBoard } from "./scoreboard";

export const router = Router();

router.get("/player", async (_req: Request, res: Response) => {
  res.json(await getPlayerScoreBoard());
});

router.get("/bot", async (_req: Request, res: Response) => {
  res.json(await getBotScoreBoard());
});
