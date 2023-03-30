//Router for tests 

const express = require('express');
const Model = require('../models/model');
const router = express.Router()



//REST Methods: Post, Get, Patch, and Delete
// Router first parameter: route
// Router second parameter: callback
// req: receiving requests from a client app
// res: sending responses to our client  


router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



router.get('/post', async (req, res) => {

})



//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        // Test Abfrage -> Eintrag mit dem 'name' = 'Denise' in der Atlas DB
        //  const dataRead = await Model.find( {
        //     name: "Denise"
        // } )

        // Test Abfrage -> Eintrag mit dem 'name' = alle Einträge in der Atlas DB
        const dataRead = await Model.find()

        // Ausgabe der eingelesenen Daten von Atlas MongoDB:
        console.log(dataRead)

        res.json(dataRead)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})


module.exports = router;

