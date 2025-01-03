require('dotenv').config()
const express = require('express')
const router = require('./routes/index.js')
const db = require('./configs/db.js')
const rootUserInit = require('./configs/rootUserInit.js')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(PORT, async () => {
    await rootUserInit()
    console.log('Payment system is running on port', PORT)
})

