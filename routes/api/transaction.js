const express = require("express");
const Goods = require("../../models/Goods");
const Transaction = require("../../models/Transaction");

const router = express.Router();

// @route   POST api/transaction
// @desc    Add new transaction
// @access  Public
router.post("/", async (req, res) => {
  const { kks, datepick, items, overallPrice } = req.body;

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
      kks,
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

module.exports = router;
