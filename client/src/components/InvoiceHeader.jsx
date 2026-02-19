import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function InvoiceHeader({ invoice }) {
  if (!invoice) return null;

  const {
    invoiceNumber,
    customerName,
    issueDate,
    dueDate,
    status,
  } = invoice;

  const statusVariant =
    status === "PAID" ? "default" : "secondary";

  return (
    <Card>
      <CardContent className="p-6 space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Invoice #{invoiceNumber}
          </h2>

          <Badge variant={statusVariant}>
            {status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">

          <div>
            <p className="text-muted-foreground">
              Customer
            </p>
            <p className="font-medium">
              {customerName}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">
              Issue Date
            </p>
            <p className="font-medium">
              {new Date(issueDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">
              Due Date
            </p>
            <p className="font-medium">
              {new Date(dueDate).toLocaleDateString()}
            </p>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}

export default InvoiceHeader;
