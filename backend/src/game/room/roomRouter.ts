import { Router } from "express";
import { getDisplayRooms } from "./gameRoom";
export const router = Router();
router.get("/", (_req, res) => {
  res.json(getDisplayRooms());
});
