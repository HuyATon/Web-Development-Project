require('dotenv').config()
const express = require('express')
const db = require('./configs/db.js')


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('it works')
})

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
})