const mongoose = require('mongoose');
const uuid = require('node-uuid')

const ProductCategorySchema = new mongoose.Schema({
    _id: {type: String, default: uuid.v4 },
    name: String,
    description: String
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema, 'ProductCategory')