const express = require('express');
const productC = require('../controllers/productC.js');
const passport = require('passport')
const checkBlackList = require('../middlewares/jwtBlackList.js')
const router = express.Router();

// router.get('/', passport.authenticate('jwt', { session: false }), checkBlackList,  productC.all); 
router.get('/:id', passport.authenticate('jwt', { session: false }), checkBlackList,  productC.getById); 

router.post('/', passport.authenticate('jwt', { session: false }), checkBlackList,  productC.create);

router.put('/:id', passport.authenticate('jwt', { session: false }), checkBlackList,  productC.update);

router.delete('/:id', passport.authenticate('jwt', { session: false }), checkBlackList,  productC.delete);

router.patch('/:id/stock', passport.authenticate('jwt', { session: false }), checkBlackList, productC.updateStock);
router.patch('/:id/discount', passport.authenticate('jwt', { session: false }), checkBlackList, productC.updateDiscount);

router.get('/', productC.all); 
// router.get('/:id',   productC.getById);

// router.post('/',  productC.create);
// router.put('/:id',  productC.update);
// router.delete('/:id',  productC.delete);

// router.patch('/:id/stock', productC.updateStock);
// router.patch('/:id/discount', productC.updateDiscount);

module.exports = router;
