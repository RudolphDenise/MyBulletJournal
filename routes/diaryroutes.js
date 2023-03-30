const express = require('express');
const { Model } = require('mongoose');
const JournalModel = require('../models/diarymodel');
const JournalRouter = express.Router()


//Show Journal EJS
JournalRouter.get("/", (req, res, next) => {
    console.log('Journal-Seite geladen')
    res.render("journal");
    next()
})


//Add one entry
JournalRouter.post("/post", async (req, res) => {
    const entryItem = new JournalModel({
        headline: req.body.headline,
        subtitle: req.body.subtitle,
        entryDate: req.body.entryDate,
        content: req.body.content
    })
    try {
        const entryToSave = await entryItem.save()
        res.status(200).json(entryToSave)

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//GET ALL entrys method
JournalRouter.get('/getAll', async (req, res) => {
    try {
        // Test Abfrage -> Eintrag mit dem 'name' = 'Denise' in der Atlas DB
        //  const dataRead = await Model.find( {
        //     name: "Denise"
        // } )

        // Test Abfrage -> Eintrag mit dem 'name' = alle Einträge in der Atlas DB
        const entryRead = await JournalModel.find()

        // Ausgabe der eingelesenen Daten von Atlas MongoDB:


        res.json(entryRead)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//GET ONE Entry
JournalRouter.get("/:j_id", async (req, res) => {
    const id = req.params.j_id;
    try {
        const oneentryRead = await JournalModel.find({
            _id: id
        })
        // Ausgabe der eingelesenen Daten von Atlas MongoDB:

        res.json(oneentryRead)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID
JournalRouter.delete("/:j_id", async (req, res, next) => {
    const id = req.params.j_id;
    try {
        await JournalModel.deleteOne({ _id: id })
        res.status(200).json({ message: 'deleted' })
    }
    catch {
        res.status(500).json({ message: error.message })
    }
})


//Update/Patch : change existing entrys
JournalRouter.patch("/:j_id", async (req, res, next) => {
    console.log('Patch was activated');
    try {
        const entryPatch = await JournalModel.findOne({ _id: req.params.j_id })
        switch (true) {
            case true:
                console.log('true works');
            case req.body.headline: entryPatch.headline = req.body.headline
                console.log('Headline exists:', req.body.headline);
            case req.body.subtitle: entryPatch.subtitle = req.body.subtitle
                console.log('subtitle exists');
            case req.body.entryDate: entryPatch.entryDate = req.body.entryDate
                console.log('entryDate exists');
            case req.body.content: entryPatch.content = req.body.content
                console.log('content exists:', req.body.content);
                break;
            default: console.log('Switch problem');
                break;
        }
        await entryPatch.save()
        res.send(entryPatch)
        res.status(200).json(entryPatch)
    }
    catch {
        return res.status(404)

    }
})


module.exports = JournalRouter;