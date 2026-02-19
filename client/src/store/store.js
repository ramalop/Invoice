import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice"
import invoiceReducer from "../store/invoice-slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        invoice:invoiceReducer
    }

})

export default store;