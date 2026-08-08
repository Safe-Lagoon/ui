import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@safelagoon/ui";

export default function TableDemo() {
  return (
    <Table className="w-full max-w-lg">
      <TableHeader>
        <TableRow>
          <TableHead>App</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-end">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>YouTube</TableCell>
          <TableCell>2h 14m</TableCell>
          <TableCell className="text-end">Limited</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Chrome</TableCell>
          <TableCell>45m</TableCell>
          <TableCell className="text-end">Allowed</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>TikTok</TableCell>
          <TableCell>1h 02m</TableCell>
          <TableCell className="text-end">Blocked</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
