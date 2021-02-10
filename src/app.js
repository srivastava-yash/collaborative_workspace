const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
const app = express()

//routes
const adminRouter = require('./routes/admin')

//models
const Organisation = require('./models/organisation')
const Team = require('./models/team')
const User = require('./models/user')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))
app.use(express.static(__dirname + '/views'))
app.use(express.urlencoded({ extended: false }))
app.use('/admin', adminRouter)



app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/login', (req, res) => {
    res.render("LR/login.ejs")
})

app.get('/Register', async (req, res) => {
    const organisations = await Organisation.find()
    res.render("LR/register.ejs", { organisations: organisations })
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let team = new Team()
        team.email = req.body.email
        team = await team.save()

        let user = new User()
        user.name = req.body.name
        user.email = req.body.email
        user.password = hashedPassword
        user.orgName = req.body.org
        user.teamID = team._id
        user = await user.save()
        res.redirect('/login')

    } catch (e) {
        console.log(e)
        res.redirect('/register')
    }
})

mongoose.connect('mongodb://localhost/colab', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err))

app.listen(8000, () => {
    console.log("Listening at port 8000")
})