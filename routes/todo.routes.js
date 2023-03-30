
const express = require('express');
const { Model } = require('mongoose');
const todoModelRouter = express.Router()
const todoModel = require('../models/todo.model');


//Show Todo Page EJS
todoModelRouter.get("/", (req, res, next) => {
    console.log('Todo-Seite geladen')
    res.render("todo");
    next()
})

//Add one Todo-Item
todoModelRouter.post("/post", async (req, res) => {
    const todoItem = new todoModel({
        todotask: req.body.todotask
    })
    try {
        const todoToSave = await todoItem.save()
        res.status(200).json(todoToSave)
        console.log('req.body:', req.body);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
todoModelRouter.get('/getAll', async (req, res) => {
    try {
        // Test Abfrage -> Eintrag mit dem 'name' = 'Denise' in der Atlas DB
        //  const dataRead = await Model.find( {
        //     name: "Denise"
        // } )

        // Test Abfrage -> Eintrag mit dem 'name' = alle Einträge in der Atlas DB
        const todoRead = await todoModel.find()

        // Ausgabe der eingelesenen Daten von Atlas MongoDB:
        console.log(todoRead)

        res.json(todoRead)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Delete by ID
todoModelRouter.delete("/:todoId", async (req, res, next) => {
    const id = req.params.todoId;
    try {
        await todoModel.deleteOne({ _id: id })
        res.status(200).json({ message: 'deleted' })
    }
    catch {
        res.status(500).json({ message: error.message })
    }
})


//Update/Patch Checked / unchecked
todoModelRouter.patch("/:todoId", async (req, res, next) => {
    try {
        const taskPatch = await todoModel.findOne({ _id: req.params.todoId })
        if (req.body.finished) {
            taskPatch.finished = req.body.finished
        }
        await taskPatch.save()
        res.send(taskPatch)
        res.status(200).json(taskPatch)
    }
    catch {
        return res.status(404)

    }
})


module.exports = todoModelRouter;