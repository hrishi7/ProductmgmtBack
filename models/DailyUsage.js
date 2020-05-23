const mongoose = require("mongoose");

const DailyUsageSchema = new mongoose.Schema({
  schedule: {
    type: String,
    enum: ["QTR", "BDM", "OVH-36M", "OVH-72M", "OVH-108M"],
  },
  coachNo: String,
  coachType: {
    type: String,
    enum: ["EOG", "PC"],
  },
  site: {
    type: String,
    enum: ["SDAH", "TKPR", "LLH", "KOAA", "SAYE", "BGP"],
  },
  startDate: String,
  endDate: String,
  dateOfInspection: String,
  daysTakenForFtWork: Number,
  slNoAsPerLoa: Number,
  description: String,
  partNo: String,
  qty: Number,
  qpc: Number,
  location: [Number],
  jnStatus: String,
  remarks: String,
  price: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("DailyUsage", DailyUsageSchema);
