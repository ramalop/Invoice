import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createInvoice, getAllInvoices } from "../store/invoice-slice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AllInvoices from "./AllInvoices";
import { useToast } from "@/hooks/use-toast";

function CreateInvoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const {toast} = useToast()

  const [lineItems, setLineItems] = useState([
    { description: "", quantity: 1, unitPrice: "" },
  ]);

  const updateLine = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] = value;
    setLineItems(updated);
  };

  const addLine = () => {
    setLineItems([
      ...lineItems,
      { description: "", quantity: 1, unitPrice: "" },
    ]);
  };

  const removeLine = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      invoiceNumber,
      customerName,
      issueDate,
      dueDate,
      lineItems,
    };

    dispatch(createInvoice(payload)).then((res) => {
      if (res.payload?.success) {
        dispatch(getAllInvoices())
        toast({title:"Invoice Created Successfully"})
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      
      <AllInvoices/>
      <Card>
        <CardHeader>
          <CardTitle>Create Invoice</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">


            <div className="space-y-2">
              <Label>Invoice Number</Label>
              <Input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
            </div>

            

            <div className="space-y-4">
              <h3 className="font-semibold">Line Items</h3>

              {lineItems.map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-3">

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) =>
                          updateLine(i, "description", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateLine(i, "quantity", Number(e.target.value))
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Unit Price</Label>
                        <Input
                          type="number"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateLine(i, "unitPrice", Number(e.target.value))
                          }
                          required
                        />
                      </div>
                    </div>

                    {lineItems.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeLine(i)}
                      >
                        Remove Line
                      </Button>
                    )}

                  </CardContent>
                </Card>
              ))}

              <Button type="button" variant="outline" onClick={addLine}>
                Add Line Item
              </Button>
            </div>

  

            <Button type="submit" className="w-full">
              Create Invoice
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateInvoice;
