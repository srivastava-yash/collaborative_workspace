const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const Organisation = require('../models/organisation')

router.get('/', (req, res) => {
    res.render("admin/index.ejs")
})

router.get('/login', (req, res) => {
    res.render("admin/login.ejs")
})

router.get('/register', (req, res) => {
    res.render("admin/register.ejs")
})

router.post('/login', async (req, res) => {
    const organisations = await Organisation.find()
    organisations.forEach(organisation => {
        bcrypt.compare(req.body.password, organisation.password)
            .then((result) => {
                if (result && req.body.email == organisation.email)
                    res.redirect('/admin')
                else
                    res.redirect('/admin/login')
            }).catch((e) => console.log(e))
    });
})

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let org = new Organisation()
        org.email = req.body.email
        org.password = hashedPassword
        org.orgName = req.body.orgName
        org = await org.save()
        console.log(org)
        res.redirect('/admin/login')
    } catch (e) {
        console.log(e)
        res.redirect('/admin/register')
    }
})
module.exports = router;