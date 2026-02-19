import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllArchieveInvoices, restoreInvoice } from "../store/invoice-slice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

const Archive = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()

  const { archiveInvoices, isLoading } = useSelector(
    (state) => state.invoice
  )

  useEffect(() => {
    dispatch(getAllArchieveInvoices())
  }, [dispatch])

  const handleRestore = async (id) => {
    
     dispatch(restoreInvoice(id)).then((data)=>{
        if(data.payload.success){
            dispatch(getAllArchieveInvoices()) 
            toast({title:"Invoice restored",variant:"primary"})
        }
        
     })
      // refresh archived list
    
  }

  return (
  <div className="max-w-3xl mx-auto p-3 space-y-6">
    <h2 className="text-2xl font-bold">Archived Invoices</h2>

    {archiveInvoices?.length === 0 && (
      <p className="text-gray-500">No archived invoices found.</p>
    )}

    <div className="grid md:grid-cols-2 gap-4">
      {archiveInvoices?.map((invoice) => (
        <Card key={invoice._id} className="relative w-full">
          <Button
            size="sm"
            variant="outline"
            className="absolute top-4 right-4 bg-green-600 hover:bg-green-500"
            onClick={() => handleRestore(invoice._id)}
          >
            Restore
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
              onClick={() => navigate(`/invoices/${invoice._id}`)}
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

export default Archive
