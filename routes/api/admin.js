const express = require('express')
const Admin = require('../../models/Admin')
const bcrypt = require("bcrypt");
const {
    findOne
} = require('../../models/Admin');

const router = express.Router();

// @route   POST api/admin
// @desc    Login admin
// @access  Public
router.post('/', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        let admin = await Admin.findOne({
            username
        })

        if (!admin) {
            return res.json({
                msg: "Login failed"
            })
        }

        bcrypt.compare(password, admin.password, (err, result) => {
            if (result) {
                return res.json({
                    name: admin.name
                })
            } else {
                return res.json({
                    msg: "Login failed"
                })
            }
        })
    } catch (err) {
        console.log(err.message);
        req.status(500).send("Server error");
    }
})

module.exports = router;