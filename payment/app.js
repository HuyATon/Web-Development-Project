require('dotenv').config()
const fs = require('fs')
const express = require('express')
const router = require('./routes/index.js')
const db = require('./configs/db.js')
const rootUserInit = require('./configs/rootUserInit.js')
const https = require('https')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../ssl', 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../ssl', 'cert.pem')),

}


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

// app.listen(PORT, async () => {
//     await rootUserInit()
//     console.log('Payment system is running on port', PORT)
// })
https.createServer(sslOptions, app).listen(PORT, async () => {
    await rootUserInit()
    console.log('Payment system is running on port', PORT)
})
