const mongoose = require('mongoose')

const KpmSchema = new mongoose.Schema({
    kks: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    hamlet: {
        type: String,
        required: true
    },
    rt: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    subDisctrict: {
        type: String,
        required: true
    }
})

module.exports = Kpm = mongoose.model('kpm', KpmSchema)