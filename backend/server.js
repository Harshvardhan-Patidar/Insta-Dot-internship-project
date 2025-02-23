require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/db.js");
const authRoutes = require("./Routes/registerRoute.js");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/register", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
