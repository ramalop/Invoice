const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/authRoute")
const invoiceRouter = require("./routes/invoiceRoutes.js")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose')


const app = express()
app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL).then(() => console.log("mongodb connected successfully")).catch((error) => console.log(error))
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter)
app.use("/api/invoices", invoiceRouter)
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))