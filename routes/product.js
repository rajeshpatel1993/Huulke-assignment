const express = require('express');

const productController = require('../controllers/product');
const validateJWT = require('../utils/jwt').validateJWT;

const router = express.Router();

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});




//  /shopinglist => GET
router.get('/list', validateJWT, productController.getProductList);


// /shoping/add => POST
router.post('/add', validateJWT, multipartMiddleware,productController.addProduct);


// /shoping/edit => POST
router.get('/product', validateJWT, productController.getProduct);


module.exports = router;

