const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Team', teamSchema)