const express = require('express')
const orderC = require('../controllers/orderC.js')
const Order = require('../models/Order.js')
const passport = require('passport')
const checkBlackList = require('../middlewares/jwtBlackList.js')


const router = express.Router()


router.get('/orders-trends', passport.authenticate('jwt', { session: false }), checkBlackList,  orderC.getOrderTrends);
router.get('/income-trends',  passport.authenticate('jwt', { session: false }), checkBlackList,  orderC.getIncomeTrends);

router.get('/overview',  passport.authenticate('jwt', { session: false }), checkBlackList,  orderC.getOverview);
router.get('/available-years',  passport.authenticate('jwt', { session: false }), checkBlackList,  orderC.getAvailableYears);




module.exports = router;