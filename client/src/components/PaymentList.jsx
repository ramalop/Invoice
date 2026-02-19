import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PaymentList({ payments, onAddPaymentClick }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payments</CardTitle>

        <Button onClick={onAddPaymentClick}>
          Add Payment
        </Button>
      </CardHeader>

      <CardContent>

        {!payments || payments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No payments recorded yet.
          </p>
        ) : (
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {new Date(p.paymentDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    ₹ {Number(p.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        )}

      </CardContent>
    </Card>
  );
}

export default PaymentList;
