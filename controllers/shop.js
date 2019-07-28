const Shop = require('../models/shop');
const ObjectId = require('mongoose').Types.ObjectId;


exports.addShop = (req, res, next) => {
    let {shopingDate, shopingTitle, qty, is_purchased, user_id, shop_id} = req.body;
    const shopUpdate = { shop_date: shopingDate, shop_title: shopingTitle, qty, is_purchased };

    let result = {};
    let status = 200;
    if(shop_id){
            Shop.update({_id:ObjectId(shop_id)},shopUpdate, (err, shop) => {
                if (!err) {
                    res.status(200).send(shop);
                } else {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                }
            })
    }else{
        const shop = new Shop({user_id, shop_date: shopingDate, shop_title : shopingTitle, qty,  is_purchased }); // document = instance of a model
        shop.save((err, shop) => {

            if (!err) {
                res.status(200).send(shop);
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }

        });
    }
};

exports.getShopList = (req,res,next)  => {
  let userId = req.query.userId;
  let result = {};
  let status = 200;

  Shop.find({user_id: new ObjectId(userId)}, (err, shop) => {

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


exports.getShop = (req,res,next)  => {
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

