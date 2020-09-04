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
        }).sort({
            'createdAt': -1
        })

        return res.json({
            goods
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/goods/id
// @desc    Delete one goods
// @access  Public
router.delete('/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        // Check if goods exists
        let goods = await Goods.findById(_id)
        if (!goods) {
            return res.status(400).json({
                errors: [{
                    msg: 'Goods not available'
                }]
            })
        }

        await Goods.deleteOne({
            _id
        })


        return res.json({
            msg: 'success'
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
})

// @route   PUT api/goods/id
// @desc    Update good
// @access  Public
router.put('/:id', async (req, res) => {
    const _id = req.params.id;

    const {
        name,
        stock,
        unit,
        buyPrice,
        sellPrice
    } = req.body

    try {
        // Check if good exists
        let good = await Goods.findById(_id)
        if (!good) {
            return res.status(400).json({
                errors: [{
                    msg: 'Goods not available'
                }]
            })
        }

        let difference = stock - good.stock
        let newQty = good.qty + difference

        await Goods.updateOne({
            name,
            stock,
            unit,
            buyPrice,
            sellPrice,
            qty: newQty
        })

        return res.json({
            msg: 'success'
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;