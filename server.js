const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("database runing okay");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
