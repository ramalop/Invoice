import { useState } from "react";
import { useDispatch } from "react-redux";

import { addPayment, getInvoiceDetails } from "../store/invoice-slice";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function AddPaymentModal({
  open,
  onClose,
  invoiceId,
  balanceDue,
}) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const num = Number(amount);

    // ---- basic validation ----

    if (!num || num <= 0) return;
    if (num > Number(balanceDue)) return;

    dispatch(addPayment({ id: invoiceId, amount: num }))
      .then(() => {
        dispatch(getInvoiceDetails(invoiceId)); // refresh page data
        setAmount("");
        onClose();
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              min="1"
              max={balanceDue}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Max ₹${balanceDue}`}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Payment
          </Button>

        </form>

      </DialogContent>
    </Dialog>
  );
}

export default AddPaymentModal;
