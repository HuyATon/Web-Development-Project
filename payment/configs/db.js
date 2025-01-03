const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI
async function connect() {
    await mongoose.connect(uri)
}

connect()
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => console.log(err))