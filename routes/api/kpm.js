const express = require('express')
const config = require('config')
const Kpm = require('../../models/Kpm')

const router = express.Router();

// @route   POST api/kpm
// @desc    Register new KPM
// @access  Public
router.post('/', async (req, res) => {
    const {
        kks,
        name,
        hamlet,
        rt,
        village,
        subDistrict
    } = req.body;

    try {
        let user = new Kpm({
            kks,
            name,
            hamlet,
            rt,
            village,
            subDistrict
        })

        // Save data to db
        await user.save();

        // Return kpm data
        return res.json({
            kpm
        })
    } catch (err) {
        console.log(err.message)
        req.status(500).send('Server error')
    }
})

// @route   GET api/kpm/getOne
// @desc    Get KPM with kks
// @access  Public
router.get('/:kks', async (req, res) => {
    try {
        let kks = req.params.kks;
        // Check if user exists
        let kpm = await Kpm.findOne({
            kks
        })

        if (!kpm) {
            return res.json({
                kpm: []
            })
        }

        return res.json({
            kpm
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router;