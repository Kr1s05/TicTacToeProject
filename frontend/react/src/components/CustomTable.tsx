import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "./ui/scroll-area";

export default function CustomTable(props: {
  data: Array<object>;
  title: string;
  cols: Array<string>;
  className?: string;
}) {
  return (
    <ScrollArea className={props.className}>
      <h2>{props.title}</h2>
      <Table>
        <TableHeader>
          <TableRow className="text-center text-lg">
            {props.cols.map((col) => (
              <TableHead>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {props.data.map((row, idx) => (
            <TableRow key={idx} className="text-center text-lg">
              {Object.values(row).map((cell) => (
                <TableCell>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
