const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON data

const todoRoutes = require("./routes/todoRoutes");
app.use("/api", todoRoutes);
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("Welcome to the To-Do API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
