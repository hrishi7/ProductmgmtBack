const mongoose = require("mongoose");

const InvoiceDetailsSchema = new mongoose.Schema({
  invoiceNo: String,
  invoiceDate: String,
  partNo: String,
  itemDescription: String,
  sacCode: String,
  qty: Number,
  stock: Number,
  price: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("InvoiceDetails", InvoiceDetailsSchema);
