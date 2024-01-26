import { Button } from "@/components/ui/button";
import SocialFooter from "@/components/social-link-footer";
import { NavLink as Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 box-border grow">
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Tic Tac Toe Online
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Play tic tac toe with your friends online.
        </p>
        <Button className="mt-16 px-8 py-4 text-2xl" asChild>
          <Link to={"/register"}>Play Now</Link>
        </Button>
      </main>
      <SocialFooter />
    </div>
  );
}

export default HomePage;
