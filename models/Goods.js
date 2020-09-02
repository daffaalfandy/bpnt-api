const mongoose = require('mongoose');

const GoodsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
})

module.exports = Goods = mongoose.model('goods', GoodsSchema, 'goods-data')