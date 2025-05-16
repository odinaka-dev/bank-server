const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();

// middlewares and database connection initiated.
const app = express();
connectDB();
app.use(cors({
  origin: ['http://localhost:9002', 'https://bank-taupe-ten.vercel.app']
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// initial get request redirect to the homepage to prevent server error.
app.get("/", (req, res) => {
  res.send("the server says hello world");
});

// routes for the users and admins
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// running on ports 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
