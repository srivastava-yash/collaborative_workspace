const mongoose = require('mongoose')

const organisationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orgName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Organisation', organisationSchema)