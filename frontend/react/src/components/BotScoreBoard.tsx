import { useBotScoreboard } from "@/hooks/useScoreBoardQueries";
import CustomTable from "./CustomTable";

export default function BotScoreBoard(props: { className?: string }) {
  const data = useBotScoreboard();
  if (!data) {
    return <span>Зареждане...</span>;
  }
  return (
    <CustomTable
      cols={["Име", "Победи", "Загуби"]}
      data={data}
      title="Бот класация"
      className={"text-center border-secondary border-2" + props.className}
    />
  );
}
