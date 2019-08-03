const express = require('express');

const shopController = require('../controllers/shop');
const validateJWT = require('../utils/jwt').validateJWT;

const router = express.Router();



//  /shopinglist => GET
router.get('/list', validateJWT, shopController.getShopList);


// /shoping/add => POST
router.post('/add',  validateJWT, shopController.addShop);


// /shoping/edit => POST
router.get('/shop', validateJWT, shopController.getShop);


module.exports = router;

