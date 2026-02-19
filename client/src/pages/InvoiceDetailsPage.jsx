import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getInvoiceDetails, addPayment } from "../store/invoice-slice";

import InvoiceHeader from "../components/InvoiceHeader";
import LineItemsTable from "../components/LineItemsTable";
import InvoiceTotals from "../components/InvoiceTotals";
import PaymentList from "../components/PaymentList";
import AddPaymentModal from "../components/AddPaymentModal";
import { Button } from "@/components/ui/button";

function InvoiceDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { invoice, lineItems, payments, totals, isLoading, error } =
    useSelector((state) => state.invoice);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getInvoiceDetails(id));
    }
  }, [id, dispatch]);
  const handleAddPayment = (amount) => {
    dispatch(addPayment({ id, amount })).then(() => {
      dispatch(getInvoiceDetails(id));
    });

    setShowPaymentModal(false);
  };


  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!invoice) return null;


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <InvoiceHeader invoice={invoice} />

      <LineItemsTable items={lineItems} />

      <InvoiceTotals totals={totals} />

      <PaymentList
        payments={payments}
        onAddPaymentClick={() => setShowPaymentModal(true)}
      />

      <AddPaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        balanceDue={totals?.balanceDue}
        onSubmit={handleAddPayment}
        invoiceId={id}
      />
    </div>
  );
}

export default InvoiceDetailsPage;
