import { Button } from "@/components/ui/button";
import { NavLink as Link } from "react-router-dom";
function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-6">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Морски шах онлайн
      </h1>
      <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
        Играй морски шах с приятели онлайн.
      </p>
      <Button className="mt-16 px-8 py-4 text-2xl" asChild>
        <Link to={"/game"}>Присъедини се сега!</Link>
      </Button>
    </main>
  );
}

export default HomePage;
