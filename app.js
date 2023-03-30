require('dotenv').config();

const express = require('express');
const app = express()
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const { readFile } = require('fs/promises')
const PORT = process.env.PORT || 5000
const mongoString = process.env.DATABASE_URL


//Template Engine
app.use(expressLayouts)
app.set("layout", "./layouts/default")
app.set("view engine", "ejs")


//connection to database
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

//makes static files available
app.use(express.static('www'))
//Middleware that 
app.use(express.urlencoded({ extended: true }))
// all responses get a CORS-Header
app.use((req, res, next) => {
    // Response-Header für alle Responses wird gesetzt...
    res.set('Access-Control-Allow-Origin', '*')
    next()
})
//Snippet allows accept data in JSON format
app.use(express.json());

// Route for Home 
app.get("/", (req, res, next) => {
    console.log('Startseite geladen')
    res.render("index");
    next()
})

//GET Request example pictures cybermoto

app.get('/cybermoto', (request, response) =>{
    console.log('request cybermoto revived');
    readFile('./data/cybermoto.json')
    .then(data => {
        jsonObj = JSON.parse(data)
        console.log(jsonObj)
        // json Datei an den Client zurücksenden
        response.send(jsonObj)
    })
    .catch(err => {
        // Fehler bei Lesen -> leeres Objekt zurücksenden
        console.error('Could not read file "cybermoto.json" -- ', err.name, err.message)
        response.send({})
    })

})

//Integrate other Modul-Routes 
const routes = require('./routes/routes');
app.use('/api', routes)

const todoRoutes = require('./routes/todo.routes');
app.use('/todo', todoRoutes)

const journalRoutes = require('./routes/diaryroutes')
app.use('/journal', journalRoutes)

//generates HTTP Server 
app.listen(PORT, () => {
    console.log('Server Started at Port:', PORT)
})












