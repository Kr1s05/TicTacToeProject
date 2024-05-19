import { getBotBoard, getPlayerBoard } from "@/api/scoreBoardApi";
import { useQuery } from "@tanstack/react-query";

export function useBotScoreboard() {
  const { data } = useQuery({
    queryKey: ["bot_sc"],
    queryFn: getBotBoard,
  });
  return data;
}

export function usePlayerScoreboard() {
  const { data } = useQuery({
    queryKey: ["player_sc"],
    queryFn: getPlayerBoard,
  });
  return data;
}
