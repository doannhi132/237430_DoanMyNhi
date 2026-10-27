
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employees");

const app = express();
app.use(cors({
  origin: (process.env.CORS_ORIGIN || "http://localhost:5173").split(",")
}));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  serverSelectionTimeoutMS: 10000
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on ${PORT}`));
})
.catch(err => {
  console.error("MongoDB connection failed:", err.message);
  process.exit(1);
});
