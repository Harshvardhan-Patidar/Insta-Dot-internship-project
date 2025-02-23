require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/db.js");
const registerRoutes = require("./Routes/registerRoute.js");
const loginRoutes = require("./Routes/loginRoute.js");
const complaintRoutes = require("./Routes/complaintRoute.js");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/register", registerRoutes);
app.use("/login",loginRoutes);
app.use("/dashboard",complaintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
