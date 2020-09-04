const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    kks: {
        type: String,
        required: true,
    },
    datepick: {
        type: Object,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    overallPrice: {
        type: Number,
        required: true
    }
})

module.exports = Transaction = mongoose.model('transactions', TransactionSchema, 'transaction-data')