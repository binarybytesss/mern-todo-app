const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middleware 
app.use(cors());
app.use(express.json());

console.log(process.env.MONGO_URL)

//Connect Mongodb

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));

//Routes

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000,() => {
    console.log("Server running on port 5000");
});