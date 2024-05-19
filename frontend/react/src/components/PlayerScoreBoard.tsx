import { usePlayerScoreboard } from "@/hooks/useScoreBoardQueries";
import Table from "./CustomTable";

export default function PlayerScoreBoard(props: { className?: string }) {
  const data = usePlayerScoreboard();
  if (!data) {
    return <span>Зареждане...</span>;
  }
  return (
    <Table
      cols={["Име", "Победи", "Загуби"]}
      data={data}
      title="PvP класация"
      className={"text-center border-secondary border-2" + props.className}
    />
  );
}
