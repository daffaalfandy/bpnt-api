const express = require("express");
const Goods = require("../../models/Goods");
const Purchase = require("../../models/PurchaseTransaction");

const router = express.Router();

// @route   POST api/goods
// @desc    Register new goods
// @access  Public
router.post("/", async (req, res) => {
  const { name, unit, stock, buyPrice, sellPrice, month, year } = req.body;

  try {
    let goods = new Goods({
      name,
      unit,
      stock,
      buyPrice,
      sellPrice,
      qty: stock,
      month,
      year,
    });

    await goods.save();

    let purchase = new Purchase({
      name,
      unit,
      stock,
      buyPrice,
      sellPrice,
      qty: stock,
      month,
      year,
      good_id: goods._id,
      oldStock: 0,
    });

    // Save to db
    await purchase.save();

    // Return goods data
    return res.json({
      goods,
    });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

// @route   GET api/goods?m= &y=
// @desc    Get all goods based on month and year
// @access  Public
router.get("/", async (req, res) => {
  const month = req.query.m;
  const year = req.query.y;

  try {
    let goods = await Goods.find({
      month,
      year,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      goods,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/goods/transaction?m= &y=
// @desc    Get goods transaction based on month and year
// @access  Public
router.get("/transaction", async (req, res) => {
  const month = req.query.m;
  const year = req.query.y;

  try {
    let purchase = await Purchase.find({
      month,
      year,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      purchase,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/goods/id
// @desc    Delete one goods
// @access  Public
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    // Check if goods exists
    let goods = await Goods.findById(_id);
    if (!goods) {
      return res.status(400).json({
        errors: [
          {
            msg: "Goods not available",
          },
        ],
      });
    }

    await Purchase.deleteMany({ good_id: goods._id });

    await Goods.deleteOne({
      _id,
    });

    return res.json({
      msg: "success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/goods/id
// @desc    Update good
// @access  Public
router.put("/:id", async (req, res) => {
  const _id = req.params.id;

  const { name, stock, unit, buyPrice, sellPrice } = req.body;

  try {
    // Check if good exists
    let good = await Goods.findById(_id);
    if (!good) {
      return res.status(400).json({
        errors: [
          {
            msg: "Goods not available",
          },
        ],
      });
    }

    let newStock = Number(good.stock) + Number(stock);
    let newQty = Number(good.qty) + Number(stock);

    await Goods.updateOne(
      {
        _id,
      },
      {
        name,
        stock: newStock,
        unit,
        buyPrice,
        sellPrice,
        qty: newQty,
      }
    );

    let purchase = new Purchase({
      name,
      unit,
      stock: newStock,
      buyPrice,
      sellPrice,
      qty: stock,
      month: good.month,
      year: good.year,
      good_id: good._id,
      oldStock: good.stock,
    });

    // Save to db
    await purchase.save();

    return res.json({
      msg: "success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
