const express = require("express");
const Goods = require("../../models/Goods");
const Transaction = require("../../models/Transaction");
const Kpm = require("../../models/Kpm");

const router = express.Router();

// @route   POST api/transaction
// @desc    Add new transaction
// @access  Public
router.post("/", async (req, res) => {
  const { kpm, datepick, items, overallPrice } = req.body;

  try {
    // Update good stock
    for (let i = 0; i < items.length; i++) {
      let good = await Goods.findOne({
        _id: items[i].itemId,
      });

      if (!good) {
        return res.status(400).json({
          errors: [
            {
              msg: "Good not registered",
            },
          ],
        });
      } else {
        await Goods.updateOne(
          {
            _id: items[i].itemId,
          },
          {
            $set: {
              stock: good.stock - items[i].qty,
            },
          }
        );
      }
    }

    // Save the transaction
    let transaction = new Transaction({
      kpm,
      datepick,
      items,
      overallPrice,
    });

    await transaction.save();

    return res.json({
      msg: "success",
    });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

// @route   GET api/transaction/:kks
// @desc    Get transaction based on kks
// @access  Public
router.get("/kks/:kks", async (req, res) => {
  const kks = req.params.kks;

  try {
    let transaction = await Transaction.find({
      "kpm.kks": kks,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      transaction,
    });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

// @route   GET api/transaction/all?d= &m= &y=
// @desc    Get transaction based on date, month, year
// @access  Public
router.get("/all", async (req, res) => {
  const month = req.query.m;
  const year = req.query.y;
  let date = "";
  if (req.query.d) {
    date = req.query.d;
  }

  try {
    let transaction;
    if (req.query.d) {
      transaction = await Transaction.find({
        datepick: {
          date,
          month,
          year,
        },
      }).sort({
        createdAt: -1,
      });
    } else {
      transaction = await Transaction.find({
        "datepick.month": month,
        "datepick.year": year,
      }).sort({
        createdAt: -1,
      });
    }

    return res.json({
      transaction,
    });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

module.exports = router;
