const express = require('express')
const config = require('config')
const Kpm = require('../../models/Kpm')

const router = express.Router();

// @route POST api/kpm
// @desc Register new KPM
// @access Public
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
            user
        })
    } catch (err) {
        console.log(err.message)
        req.status(500).send('Server error')
    }
})

module.exports = router;