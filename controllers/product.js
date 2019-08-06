const Product = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;
const config = require("../config/config");

const imageurl = config['app'].imageUrl;

exports.addProduct = (req, res, next) => {
    // console.log(req.files.uploads);
    // console.log(req.body);

    var image = [];
    req.files.uploads.forEach((item,index) => {

        let tmpStr = item.path.split("/");
       image.push(imageurl+tmpStr[1]);
      
    });
    

    let {productName, description, price, category, user_id, product_id} = req.body;
    const productUpdate = { user_id, productName, description, price, category };

    let result = {};
    let status = 200;
    if(product_id){
            Product.update({_id:ObjectId(product_id)},productUpdate, (err, product) => {
                if (!err) {
                    res.status(200).send(product);
                } else {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                }
            })
    }else{
        const product = new Product({user_id, productName, description, price,  category, images: image}); // document = instance of a model
     

        product.save((err, products) => {

            if (!err) {
                res.status(200).send(products);
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }

        });
    }

    
    // let {shopingDate, shopingTitle, qty, is_purchased, user_id, shop_id} = req.body;
    // const shopUpdate = { shop_date: shopingDate, shop_title: shopingTitle, qty, is_purchased };

    // let result = {};
    // let status = 200;
    // if(shop_id){
    //         Shop.update({_id:ObjectId(shop_id)},shopUpdate, (err, shop) => {
    //             if (!err) {
    //                 res.status(200).send(shop);
    //             } else {
    //                 status = 500;
    //                 result.status = status;
    //                 result.error = err;
    //                 res.status(status).send(result);
    //             }
    //         })
    // }else{
    //     const shop = new Shop({user_id, shop_date: shopingDate, shop_title : shopingTitle, qty,  is_purchased }); // document = instance of a model
    //     shop.save((err, shop) => {

    //         if (!err) {
    //             res.status(200).send(shop);
    //         } else {
    //             status = 500;
    //             result.status = status;
    //             result.error = err;
    //             res.status(status).send(result);
    //         }

    //     });
    // }



};

exports.getProductList = (req,res,next)  => {
  let userId = req.query.userId;
  let result = {};
  let status = 200;

  Product.find({user_id: new ObjectId(userId)}, (err, shop) => {

      if (!err) {
          res.status(200).send(shop);
      } else {
          status = 500;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
      }

  });

};


exports.getProduct = (req,res,next)  => {
    let userId = req.query.userId;
    let shopId = req.query.shopId;
    let result = {};
    let status = 200;

    Shop.findOne({user_id: new ObjectId(userId), _id: ObjectId(shopId)}, (err, shop) => {

        if (!err) {
            res.status(200).send(shop);
        } else {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }

    });

};

