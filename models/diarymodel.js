// // //Diary Model
const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
    headline: {
        type: String

    },
    subtitle: {
        type: String

    },
    entryDate: {
        type: String
        // default: Date.now
    },
    content: {
        // required: true,
        type: String

    },
    creationDate:{
        type: Object,
        default: Date.now
    }

})

module.exports = mongoose.models.Diary || mongoose.model('Diary', DiarySchema); 
