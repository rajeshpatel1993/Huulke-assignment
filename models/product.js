const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    user_id: {
        type:  Schema.Types.ObjectId,
        required: true
    },
    productName: {
    type: String,
    required: true
  },
  images: [],
  description: {
    type: String,
    required: true
  },
  price: {
      type: Number,
      required: true
  },
  category: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
 
});


module.exports = mongoose.model('Product', productSchema, 'products');