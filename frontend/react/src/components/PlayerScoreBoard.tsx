import { usePlayerScoreboard } from "@/hooks/useScoreBoardQueries";
import Table from "./CustomTable";

export default function PlayerScoreBoard(props: { className?: string }) {
  const data = usePlayerScoreboard();
  if (!data) {
    return <span>Loading...</span>;
  }
  return (
    <Table
      cols={["Username", "Wins", "Losses"]}
      data={data}
      title="PvP Scoreboard"
      className={"text-center border-secondary border-2" + props.className}
    />
  );
}
