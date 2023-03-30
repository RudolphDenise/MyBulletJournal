const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
    todotask:
    {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    },
})
module.exports = mongoose.models.TodoTask || mongoose.model('TodoTask', todoTaskSchema);
