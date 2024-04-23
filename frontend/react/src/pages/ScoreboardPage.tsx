import BotScoreBoard from "@/components/BotScoreBoard";
import PlayerScoreBoard from "@/components/PlayerScoreBoard";

export default function ScoreboardPage() {
  return (
    <main className="flex grow flex-col justify-evenly items-center sm:flex-row">
      <PlayerScoreBoard className=" text-xl h-[40vh] w-fit sm:h-[65vh]" />
      <BotScoreBoard className=" text-xl h-[40vh] w-fit sm:h-[65vh]" />
    </main>
  );
}
