const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
app.use(cors());

dotenv.config({ path: "./config/config.env" });

/* call mongodb method*/

const mongoDB = require("./config/db");
mongoDB();

/**routes */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/invoice-details", require("./routes/invoiceDetails"));
app.use("/api/daily-usage", require("./routes/dailyUsage"));
// app.use("/api/bill", require("./routes/bill"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is Running on Port " + PORT);
});
