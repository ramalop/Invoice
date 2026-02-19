import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  invoice: null,
  lineItems: [],
  payments: [],
  totals: null,
  isLoading: false,
  error: null,
  allInvoices: [],
  archiveInvoices:[]
};
export const createInvoice = createAsyncThunk(
  "/invoice/create",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/invoices",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);
export const getInvoiceDetails = createAsyncThunk(
  "/invoice/details",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/invoices/${id}`,
      { withCredentials: true }
    );
    return response.data;
  }
);
export const addPayment = createAsyncThunk(
  "/invoice/addPayment",
  async ({ id, amount }) => {
    const response = await axios.post(
      `http://localhost:5000/api/invoices/${id}/payments`,
      { amount },
      { withCredentials: true }
    );
    return response.data;
  }
);
export const archiveInvoice = createAsyncThunk(
  "/invoice/archive",
  async (id) => {
    const response = await axios.post(
      "http://localhost:5000/api/invoices/archive",
      { id },
      { withCredentials: true }
    );
    return response.data;
  }
);
export const restoreInvoice = createAsyncThunk(
  "/invoice/restore",
  async (id) => {
    const response = await axios.post(
      "http://localhost:5000/api/invoices/restore",
      { id },
      { withCredentials: true }
    );
    return response.data;
  }
);
export const getAllInvoices = createAsyncThunk("/invoices/getAllInvoices", async () => {
  const response = await axios.get("http://localhost:5000/api/invoices/allInvoices", { withCredentials: true })
  return response.data
})
export const getAllArchieveInvoices = createAsyncThunk("/invoices/getAllArchieveInvoices", async () => {
  const response = await axios.get("http://localhost:5000/api/invoices/archive", { withCredentials: true })
  return response.data
})
export const archieveInvoice = createAsyncThunk("/invoice/archieve", async (id) => {
  const response = await axios.post("http://localhost:5000/api/invoices/archieve",{id}, { withCredentials: true })
  return response.data
})

const invoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // create invoice
      .addCase(createInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInvoice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createInvoice.rejected, (state) => {
        state.isLoading = false;
      })

      // get details
      .addCase(getInvoiceDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvoiceDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoice = action.payload.invoice;
        state.lineItems = action.payload.lineItems;
        state.payments = action.payload.payments;
        state.totals = action.payload.totals;
      })
      .addCase(getInvoiceDetails.rejected, (state) => {
        state.isLoading = false;
      })

      // add payment
      .addCase(addPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPayment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addPayment.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(archiveInvoice.fulfilled, (state) => {
        if (state.invoice) {
          state.invoice.isArchived = true;
        }
      })
      .addCase(restoreInvoice.fulfilled, (state) => {
        if (state.invoice) {
          state.invoice.isArchived = false;
        }
      }).addCase(getAllInvoices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allInvoices = action.payload.invoices
      })
      .addCase(getAllInvoices.rejected, (state) => {
        state.isLoading = false;
      }).addCase(getAllArchieveInvoices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllArchieveInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.archiveInvoices = action.payload.archiveInvoices
      })
      .addCase(getAllArchieveInvoices.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default invoiceSlice.reducer;
