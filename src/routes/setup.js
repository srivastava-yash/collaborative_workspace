const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("LR/login.ejs")
})

router.get('/Register', (req, res) => {
    res.render("LR/Register.ejs")
})

module.exports = router;