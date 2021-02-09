const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

//routes
const setupRouter = require('./routes/setup')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))
app.use(express.static(__dirname + '/views'))
app.use(express.urlencoded({ extended: false }))
app.use('/admin', setupRouter)



app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/login', (req, res) => {
    res.render("LR/login.ejs")
})

app.get('/Register', (req, res) => {

    res.render("LR/register.ejs")
})


mongoose.connect('mongodb://localhost/colab', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err))

app.listen(8000, () => {
    console.log("Listening at port 8000")
})