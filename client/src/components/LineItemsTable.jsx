import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LineItemsTable({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Items</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>

          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Line Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {item.description}
                </TableCell>

                <TableCell className="text-right">
                  {item.quantity}
                </TableCell>

                <TableCell className="text-right">
                  ₹ {Number(item.unitPrice).toFixed(2)}
                </TableCell>

                <TableCell className="text-right font-semibold">
                  ₹ {Number(item.lineTotal).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </CardContent>
    </Card>
  );
}

export default LineItemsTable;
