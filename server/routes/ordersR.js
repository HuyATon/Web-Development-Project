const express = require('express')
const orderC = require('../controllers/orderC.js')
const passport = require('passport')
const checkBlackList = require('../middlewares/jwtBlackList.js')

const router = express.Router()

router.get('/:id', orderC.getById);
router.get('/', orderC.all);
router.get('/user/:id', orderC.getUserOrdersById);
router.post('/', orderC.create);
router.put('/:id', orderC.update);
router.patch('/:id/payment_status', orderC.updatePaymentStatus);
router.delete('/:id', orderC.delete);


module.exports = router;