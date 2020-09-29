const mongoose = require("mongoose");

const PurchaseTransactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    buyPrice: {
      type: Number,
      required: true,
    },
    sellPrice: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    good_id: {
      type: String,
      required: true,
    },
    oldStock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Purchase = mongoose.model(
  "purchase",
  PurchaseTransactionSchema,
  "purchase-data"
);
