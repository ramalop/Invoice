const Invoice = require("../models/Invoice");
const InvoiceLine = require("../models/InvoiceLine");
const Payment = require("../models/Payment");


 const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      customerName,
      issueDate,
      dueDate,
      lineItems,
    } = req.body;

    if (!lineItems || lineItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one line item required",
      });
    }

    //calculate totals
    let total = 0;

    const computedLines = lineItems.map((item) => {
      const lineTotal = item.quantity * item.unitPrice;
      total += lineTotal;

      return {
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal,
      };
    });

    //create invoice
    const invoice = await Invoice.create({
      userId: req.user.id,
      invoiceNumber,
      customerName,
      issueDate,
      dueDate,
      total,
      amountPaid: 0,
      balanceDue: total,
    });

    //attach invoiceId to line items
    const linesWithInvoiceId = computedLines.map((l) => ({
      ...l,
      invoiceId: invoice._id,
    }));

    await InvoiceLine.insertMany(linesWithInvoiceId);

    res.status(201).json({
      success: true,
      message: "Invoice created",
      invoiceId: invoice._id,
      total,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
 const getInvoiceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const lineItems = await InvoiceLine.find({ invoiceId: id });
    const payments = await Payment.find({ invoiceId: id });

    res.json({
      success: true,
      invoice,
      lineItems,
      payments,
      totals: {
        total: invoice.total,
        amountPaid: invoice.amountPaid,
        balanceDue: invoice.balanceDue,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
 const addPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Payment amount must be greater than 0",
      });
    }

    const invoice = await Invoice.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (amount > invoice.balanceDue) {
      return res.status(400).json({
        success: false,
        message: "Overpayment not allowed",
      });
    }

    // create payment
    await Payment.create({
      invoiceId: id,
      amount,
    });

    // update invoice
    invoice.amountPaid += amount;
    invoice.balanceDue = invoice.total - invoice.amountPaid;

    if (invoice.balanceDue === 0) {
      invoice.status = "PAID";
    }

    await invoice.save();

    res.json({
      success: true,
      message: "Payment added successfully",
      invoice,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
 const archiveInvoice = async (req, res) => {
  try {
    const { id } = req.body;

    const invoice = await Invoice.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isArchived: true },
      { returnDocument: "after" }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.json({
      success: true,
      message: "Invoice archived",
      invoice,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
 const restoreInvoice = async (req, res) => {
  try {
    const { id } = req.body;

    const invoice = await Invoice.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isArchived: false },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.json({
      success: true,
      message: "Invoice restored",
      invoice,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getAllArchieveInvoices = async (req,res)=>{
  try {
    const userId = req.user.id
    const archiveInvoices = await Invoice.find({ userId: userId,isArchived: true })
    res.status(200).json({
      success:true,
      archiveInvoices
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Some error occurred"})
  }
}
const getAllInvoices = async (req,res)=>{
  try {
    const userId = req.user.id
    const invoices = await Invoice.find({ userId: userId,isArchived: false })
    res.status(200).json({
      success:true,
      invoices
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Some error occurred"})
  }
}



module.exports = 
{createInvoice,getInvoiceDetails,addPayment,archiveInvoice,archiveInvoice,restoreInvoice,getAllInvoices,getAllArchieveInvoices}

