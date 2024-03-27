import BotScoreBoard from "@/components/BotScoreBoard";
import PlayerScoreBoard from "@/components/PlayerScoreBoard";

export default function ScoreboardPage() {
  return (
    <main className="flex flex-col lg:flex-row justify-center h-[88vh] xl:gap-56  xl:p-48 lg:p-28 lg:gap-28 md:p-20 md:gap-16 sm:p-12 sm:gap-10">
      <PlayerScoreBoard className=" text-xl h-fit" />
      <BotScoreBoard className=" text-xl h-fit" />
    </main>
  );
}
