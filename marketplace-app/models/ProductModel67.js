const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
}, { timestamps: true });


const ProductModel67 = mongoose.model('Product', ProductSchema);

module.exports = ProductModel67;
//module.exports = mongoose.model('Product', ProductSchema);
