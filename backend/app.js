require('dotenv').config()
const express    = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/articles')

const app = express()


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)
app.use('/api/articles', articleRoutes)

module.exports = app