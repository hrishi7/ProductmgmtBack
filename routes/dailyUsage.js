const router = require("express").Router();

const DailyUsage = require("../models/DailyUsage");

/**Create */
/**its complecated
 * 1. get description and find all description from invoicedetails
 * 2. get qty make sure it is less or equal if qrc
 * 3. get totaldescription qty from invoicedetails table and then check if it is greater
 * 4. loop through rows and update qty and calculate price along with that
 */
router.post("/", async (req, res) => {
  //   try {
  //     const {
  //         schedule: {
  //             type: String,
  //             enum: ["QTR", "BDM", "OVH-36M", "OVH-72M", "OVH-108M"],
  //           },
  //           coachNo: String,
  //           coachType: {
  //             type: String,
  //             enum: ["EOG", "PC"],
  //           },
  //           site: {
  //             type: String,
  //             enum: ["SDAH", "TKPR", "LLH", "KOAA", "SAYE", "BGP"],
  //           },
  //           startDate: String,
  //           endDate: String,
  //           dateOfInspection: String,
  //           daysTakenForFtWork: Number,
  //           slNoAsPerLoa: Number,
  //           description: String,
  //           partNo: String,
  //           qty: Number,
  //           qpc: Number,
  //           location: [Number],
  //           jnStatus: String,
  //           remarks: String,
  //           price: Number,
  //     } = req.body;
  //     if (
  //       !invoiceNo ||
  //       !invoiceDate ||
  //       !partNo ||
  //       !itemDescription ||
  //       !sacCode ||
  //       !qty ||
  //       !price
  //     ) {
  //       return res.status(401).json({ message: "Please Enter All fields" });
  //     }
  //     let addedInvoice = await InvoiceDetails.create({
  //       invoiceNo,
  //       invoiceDate,
  //       partNo,
  //       itemDescription,
  //       sacCode,
  //       qty,
  //       stock: qty,
  //       price,
  //     });
  //     res.status(201).json(addedInvoice);
  //   } catch (error) {
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
});

/**Read */
router.get("/", async (req, res) => {
  try {
    let allDailyUsageData = await DailyUsage.find();
    res.status(200).json(allDailyUsageData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**Update */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, dateOfInspection, location } = req.body;
    let updatedObj = {};
    if (startDate) {
      updatedObj.startDate = startDate;
    }
    if (endDate) {
      updatedObj.endDate = endDate;
    }
    if (dateOfInspection) {
      updatedObj.dateOfInspection = dateOfInspection;
    }
    if (location && location.length > 0) {
      updatedObj.location = location;
    }
    if (!id) {
      return res.status(401).json({ message: "Please Provide Id" });
    }
    let updatedDailyUsage = await DailyUsage.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: updatedObj,
      },
      { new: true }
    );
    res.status(200).json(updatedDailyUsage);
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
    await DailyUsage.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
