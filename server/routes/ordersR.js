const express = require('express')
const orderC = require('../controllers/orderC.js')
const passport = require('passport')
const checkBlackList = require('../middlewares/jwtBlackList.js')

const router = express.Router()

router.get('/:id', passport.authenticate('jwt', { session: false }), checkBlackList,  orderC.getById);
router.get('/',  passport.authenticate('jwt', { session: false }), checkBlackList,  orderC.all);
router.get('/user/:id', passport.authenticate('jwt', { session: false }), checkBlackList,  orderC.getUserOrdersById);
router.post('/',  passport.authenticate('jwt', { session: false }), checkBlackList, orderC.create);
router.put('/:id',  passport.authenticate('jwt', { session: false }), checkBlackList,  orderC.update);
router.patch('/:id/payment_status',  passport.authenticate('jwt', { session: false }), checkBlackList, orderC.updatePaymentStatus);
router.delete('/:id', passport.authenticate('jwt', { session: false }), checkBlackList,  orderC.delete);


module.exports = router;