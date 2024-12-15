const express = require('express')
const userC = require('../controllers/userC.js')
const router = express.Router()

router.get('/register', (req, res) => {
    res.send('register')
})
router.post('/register', userC.register)
router.post('/login', userC.login)
router.get('/logout', userC.logout)

module.exports = router