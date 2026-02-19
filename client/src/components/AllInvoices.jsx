import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllInvoices, archiveInvoice } from "../store/invoice-slice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function AllInvoices() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast()

  const { allInvoices, isLoading } = useSelector(
    (state) => state.invoice
  );

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const handleViewInvoice = (id) => {
    navigate(`/invoices/${id}`);
  };

  const handleArchive = async (id) => {
    dispatch(archiveInvoice(id)).then((data)=>{
      if(data.payload.success){
        dispatch(getAllInvoices());
        toast({title:"Invoice archived",variant:"destructive"})
      }
    });
    
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-3 space-y-6">
      <h2 className="text-2xl font-bold">All Invoices</h2>
      <Button onClick={()=>navigate("/archive")}>View Archive</Button>

      {allInvoices?.length === 0 && (
        <p className="text-gray-500">No invoices found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {allInvoices?.map((invoice) => (
          <Card key={invoice._id} className="relative w-full">

            <Button
              size="sm"
              variant="outline"
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-500"
              onClick={() => handleArchive(invoice._id)}
            >
              Archive
            </Button>

            <CardHeader>
              <CardTitle>
                Invoice #{invoice.invoiceNumber}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p>
                <strong>Customer:</strong> {invoice.customerName}
              </p>
              <p>
                <strong>Issue Date:</strong>{" "}
                {invoice.issueDate?.slice(0, 10)}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {invoice.dueDate?.slice(0, 10)}
              </p>

              <Button
                className="mt-3 w-full"
                onClick={() => handleViewInvoice(invoice._id)}
              >
                View Invoice
              </Button>
            </CardContent>
          </Card>
          
        ))}
      </div>
      
    </div>
  );
}

export default AllInvoices;
