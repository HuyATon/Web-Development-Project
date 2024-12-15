require('dotenv').config()
const express = require('express')
const db = require('./configs/db.js')
const cors = require('cors')
const authR = require('./routes/authR.js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors
app.use(cors())

// passport
const passport = require('passport')
require('./configs/passportConfig.js')(app)

// routes
app.use('/auth', authR)

const checkBlackList = require('./middlewares/jwtBlackList.js')
app.get('/protected', passport.authenticate('jwt', { session: false }), checkBlackList, (req, res) => {
    res.json({
        success: true,
        message: 'You are authenticated.'
    })
})

// global erorr handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500 // internal server error
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        message: message
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
})