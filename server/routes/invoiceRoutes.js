const express = require("express")
const {
  createInvoice,
  getInvoiceDetails,
  addPayment,
  archiveInvoice,
  restoreInvoice,
  getAllInvoices,
  getAllArchieveInvoices,
} = require("../controllers/invoice-controller.js");

const { authMiddleware } = require("../controllers/auth-controller.js");

const router = express.Router();

// create invoice
router.post("/", authMiddleware, createInvoice);
router.post("/archive", authMiddleware, archiveInvoice);
router.post("/restore", authMiddleware, restoreInvoice);

// get invoice details
router.get("/allInvoices", authMiddleware, getAllInvoices);
router.get("/archive", authMiddleware, getAllArchieveInvoices);
router.get("/:id", authMiddleware, getInvoiceDetails);


// add payment
router.post("/:id/payments", authMiddleware, addPayment);

// archive invoice
router.post("/archive", authMiddleware, archiveInvoice);

// restore invoice
router.post("/restore", authMiddleware, restoreInvoice);

module.exports = router;