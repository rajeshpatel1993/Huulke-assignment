const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    user_id: {
        type:  Schema.Types.ObjectId,
        required: true
    },
  shop_date: {
    type: Date,
    required: true
  },
  shop_title: {
    type: 'String',
    required: true
  },
  qty: {
      type: Number,
      required: true
  },
  is_purchased: {
    type: Boolean,
    default: false
  }
 
});


module.exports = mongoose.model('Shop', shopSchema, 'shoping');