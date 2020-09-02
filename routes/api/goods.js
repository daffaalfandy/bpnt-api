const express = require('express')
const Goods = require('../../models/Goods')

const router = express.Router();

// @route   POST api/goods
// @desc    Register new goods
// @access  Public
router.post('/', async (req, res) => {
    const {
        name,
        unit,
        stock,
        buyPrice,
        sellPrice,
        month,
        year
    } = req.body

    try {
        let goods = new Goods({
            name,
            unit,
            stock,
            buyPrice,
            sellPrice,
            qty: stock,
            month,
            year
        })

        // Save to db
        await goods.save();

        // Return goods data
        return res.json({
            goods
        })
    } catch (err) {
        console.log(err.message);
        req.status(500).send('Server error')
    }
})

// @route   GET api/goods?m= &y=
// @desc    Get all goods based on mont and year
// @access  Public
router.get('/', async (req, res) => {
    const month = req.query.m;
    const year = req.query.y;

    try {
        let goods = await Goods.find({
            month,
            year
        })

        return res.json({
            goods
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;