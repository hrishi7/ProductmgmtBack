const router = require("express").Router();

const InvoiceDetails = require("../models/InvoiceDetails");

/**Create */
router.post("/", async (req, res) => {
  try {
    const {
      invoiceNo,
      invoiceDate,
      partNo,
      itemDescription,
      sacCode,
      qty,
      price,
    } = req.body;
    if (
      !invoiceNo ||
      !invoiceDate ||
      !partNo ||
      !itemDescription ||
      !sacCode ||
      !qty ||
      !price
    ) {
      return res.status(401).json({ message: "Please Enter All fields" });
    }
    let addedInvoice = await InvoiceDetails.create({
      invoiceNo,
      invoiceDate,
      partNo,
      itemDescription,
      sacCode,
      qty,
      stock: qty,
      price,
    });
    res.status(201).json(addedInvoice);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**Read */
router.get("/", async (req, res) => {
  try {
    let allInvoiceData = await InvoiceDetails.find();
    res.status(200).json(allInvoiceData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**Update */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { invoiceNo, invoiceDate } = req.body;
    let updatedObj = {};
    if (invoiceDate) {
      updatedObj.invoiceDate = invoiceDate;
    }
    if (invoiceNo) {
      updatedObj.invoiceNo = invoiceNo;
    }
    if (!id) {
      return res.status(401).json({ message: "Please Provide Id" });
    }
    let updatedInvoiceDetails = await InvoiceDetails.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: updatedObj,
      },
      { new: true }
    );
    res.status(200).json(updatedInvoiceDetails);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**Delete */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ message: "Please Provide Id" });
    }
    await InvoiceDetails.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
