import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function InvoiceTotals({ totals }) {
  if (!totals) return null;

  const { total, amountPaid, balanceDue } = totals;

  const isPaid = Number(balanceDue) === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Totals</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total</span>
          <span className="font-medium">
            ₹ {Number(total).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Amount Paid</span>
          <span className="font-medium">
            ₹ {Number(amountPaid).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold">Balance Due</span>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              ₹ {Number(balanceDue).toFixed(2)}
            </span>

            {isPaid && (
              <Badge>PAID</Badge>
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

export default InvoiceTotals;
