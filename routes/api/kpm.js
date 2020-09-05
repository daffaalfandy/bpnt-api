const express = require("express");
const Kpm = require("../../models/Kpm");

const router = express.Router();

// @route   GET api/kpm
// @desc    Get all kpm
// @access  Public
router.get("/", async (req, res) => {
    try {
        let allKpm = await Kpm.find({}).sort({
            createdAt: -1
        });

        return res.json({
            allKpm,
        });
    } catch (err) {
        console.log(err.message);
        req.status(500).send("Server error");
    }
});

// @route   POST api/kpm
// @desc    Register new KPM
// @access  Public
router.post("/", async (req, res) => {
    const {
        kks,
        name,
        hamlet,
        rt,
        village,
        subDistrict
    } = req.body;

    try {
        // Check if kpm exists
        let kpm = await Kpm.findOne({
            kks,
        });
        if (kpm) {
            return res.status(400).json({
                errors: [{
                    msg: "User already exists",
                }, ],
            });
        }

        kpm = new Kpm({
            kks,
            name,
            hamlet,
            rt,
            village,
            subDistrict,
        });

        // Save data to db
        await kpm.save();

        // Return kpm data
        return res.json({
            kpm,
        });
    } catch (err) {
        console.log(err.message);
        req.status(500).send("Server error");
    }
});

// @route   GET api/kpm/getOne
// @desc    Get KPM with kks
// @access  Public
router.get("/:kks", async (req, res) => {
    try {
        let kks = req.params.kks;
        // Check if user exists
        let kpm = await Kpm.findOne({
            kks,
        });

        if (!kpm) {
            return res.json({
                kpm: [],
            });
        }

        return res.json({
            kpm,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

// @route   DELETE api/kpm/:id
// @desc    Delete one kpm
// @access  Public
router.delete("/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        // Check if kpm exists
        let kpm = await Kpm.findById(_id);
        if (!kpm) {
            return res.status(400).json({
                errors: [{
                    msg: "Kpm not found.",
                }, ],
            });
        }

        await Kpm.deleteOne({
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

// @route   PUT api/kpm/:id
// @desc    Update one kpm
// @access  Public
router.put("/:id", async (req, res) => {
    const _id = req.params.id
    const {
        name,
        hamlet,
        rt,
        village,
        subDistrict
    } = req.body

    try {
        // Check if kpm exists
        let checkKpm = await Kpm.findById(_id)
        if (!checkKpm) {
            return res.status(400).json({
                errors: [{
                    msg: "Kpm not found",
                }, ],
            });
        }

        let kpm = await Kpm.updateOne({
            _id
        }, {
            name,
            hamlet,
            rt,
            village,
            subDistrict
        });

        return res.json({
            kpm
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;