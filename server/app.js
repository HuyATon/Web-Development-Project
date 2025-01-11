require('dotenv').config()
const express = require('express')
const fs = require('fs')
const db = require('./configs/db.js')
const cors = require('cors')
const routes = require('./routes/index.js')
const cloudinary = require('./configs/upload.js');
const https = require('https')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../ssl', 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../ssl', 'cert.pem')),
   
}


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors
app.use(cors())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// passport
const passport = require('passport')
require('./configs/passportConfig.js')(app)

// routes
app.use(routes)

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

// app.listen(PORT, () => {
//     console.log(`Server is running on: http://localhost:${PORT}`)
// })

https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Server is running on: https://localhost:${PORT}`)
})