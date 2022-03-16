const mongoose = require('mongoose');
const uuid = require('node-uuid')

const BrandSchema = new mongoose.Schema({
    _id: {type: String, default: uuid.v4 },
    name: String
});

module.exports = mongoose.model('Brand', BrandSchema, 'Brand')