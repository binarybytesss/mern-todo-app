//routes ==> talk to the databases 

const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo.js");

//GET ALL TODO 
router.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

//POST NEW TODO 
router.post("/", async (req, res) => {
  try {
    console.log("Incoming Body:", req.body);  // 👈 DEBUG

    const newTodo = await Todo.create(req.body);

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("POST ERROR:", error);      // 👈 DEBUG
    res.status(500).json({ message: error.message });
  }
});

//DELETE TODO 
router.delete("/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router; 