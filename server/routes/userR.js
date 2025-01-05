const express = require('express')
const router = express.Router()
const passport = require('passport')
const userC = require('../controllers/userC.js')
const checkBlackList = require('../middlewares/jwtBlackList.js')


router.use('/me', passport.authenticate('jwt', { session: false }), checkBlackList, userC.getMe)
router.put('/update',  passport.authenticate('jwt', { session: false }), userC.updateUser);


module.exports = router