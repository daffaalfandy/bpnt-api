const express = require('express')
const Admin = require('../../models/Admin')
const bcrypt = require("bcrypt");
const {
    findOne
} = require('../../models/Admin');

const router = express.Router();

// @route   GET api/admin
// @desc    Get all user
// @access  Admin only
router.get('/', async (req, res) => {
    let admins = await Admin.find({})

    return res.json({
        admins
    })
})

// @route   POST api/admin/register
// @desc    Add new user
// @access  Admin only
router.post('/register', async (req, res) => {
    const {
        username,
        name,
        role,
        password
    } = req.body

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        let admin = new Admin({
            username,
            name,
            role,
            password: hash
        });

        await admin.save();

        return res.json({
            admin
        })

    } catch (err) {
        console.log(err.message);
        req.status(500).send("Server error");
    }
})

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
                    admin
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

// @route   PUT api/admin/update/id
// @desc    Update user
// @access  Admin only
router.put('/update/:id', async (req, res) => {
    const _id = req.params.id

    const {
        name,
        username,
        role
    } = req.body

    try {
        // Check exists admin
        let admin = await Admin.findById(_id)
        if (!admin) {
            return res.status(400).json({
                errors: [{
                    msg: "Admin not available",
                }, ],
            });
        }

        let payload = {
            name,
            username,
            role
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            payload.password = hash
        }

        await Admin.updateOne({
            _id
        }, payload)

        return res.json({
            msg: "success",
            admin: await Admin.findById(_id)
        });
    } catch (err) {
        console.log(err.message);
        req.status(500).send("Server error");
    }
})

// @route   DELETE api/admin/delete/id
// @desc    Delete user
// @access  Admin only
router.delete('/delete/:id', async (req, res) => {
    const _id = req.params.id

    try {
        // Check if admin exists
        let admin = await Admin.findById(_id)
        if (!admin) {
            return res.status(400).json({
                errors: [{
                    msg: "Admin not available",
                }, ],
            });
        }

        await Admin.deleteOne({
            _id
        })

        return res.json({
            msg: "success",
        });
    } catch (err) {
        console.log(err.message);
        req.status(500).send("Server error");
    }
})

module.exports = router;