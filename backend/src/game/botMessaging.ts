import { Consumer, Publisher } from "@/amqp/messageQueue";
import { Board } from "./logic/gameLogic";
import { makeMove } from "./game";

export async function setupBotMessaging(): Promise<(msg: BotMessage) => void> {
  await Consumer((msg) => {
    const response = msg as BotResponse;
    makeMove(response.Index, {
      username: "Bot",
      roomId: response.RoomId,
      socket: undefined,
    });
  });
  const publish = await Publisher();
  return (message: BotMessage) => {
    publish(message);
  };
}

export type BotMessage = {
  roomId: string;
  board: Board;
  turn: "x" | "o";
};

export type BotResponse = {
  RoomId: string;
  Index: number;
};
