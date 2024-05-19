import { Info } from "@/components/Info";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AboutPage() {
  return (
    <main>
      <ScrollArea className="h-[85vh] w-screen">
        <Info />
      </ScrollArea>
    </main>
  );
}
