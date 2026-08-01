const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Todo API is Running 🚀");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});