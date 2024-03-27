import { useBotScoreboard } from "@/hooks/useScoreBoardQueries";
import CustomTable from "./CustomTable";

export default function BotScoreBoard(props: { className?: string }) {
  const data = useBotScoreboard();
  if (!data) {
    return <span>Loading...</span>;
  }
  return (
    <CustomTable
      cols={["Username", "Wins", "Losses"]}
      data={data}
      title="Bot ScoreBoard"
      className={"text-center border-secondary border-2" + props.className}
    />
  );
}
