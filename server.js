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
const cors = require('cors');

// Allow origins for both local build and live build on vercel
const allowedOrigins = ['http://localhost:3000', 'https://bank-taupe-ten.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // for authorization headers or cookies
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
