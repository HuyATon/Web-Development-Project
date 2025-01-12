const express = require('express')
const userC = require('../controllers/userC.js')
const passport = require('passport')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/register', (req, res) => {
    res.send('register')
})
router.post('/register', userC.register)
router.post('/login', userC.login)
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false } ))
router.get('/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect: 'https://localhost:8080/login'
}), (req, res) => {
    const user = req.user
    const payload = { id: user._id, username: user.username, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.redirect('https://localhost:8080/login?token=' + token)
})
router.get('/logout', userC.logout)

module.exports = router