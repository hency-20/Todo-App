const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

app.use("/", authRoutes);
app.use("/", taskRoutes);