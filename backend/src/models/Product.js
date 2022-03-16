const mongoose = require('mongoose');
const uuid = require('node-uuid')

const ProductSchema = new mongoose.Schema({
    _id: {type: String, default: uuid.v4 },
    name: String,
    description: String,
    price: { type:Number, get: getPrice, set: setPrice},
    stock: Number,
    productCategory_name: String,
    brand_name: String
});

function getPrice(num) {
    return (num/100).toFixed(2);
}

function setPrice(num) {
    return num * 100;
}

module.exports = mongoose.model('Product', ProductSchema, 'Product')