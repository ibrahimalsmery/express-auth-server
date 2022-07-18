const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        default: null,
    },
    user_email: {
        type: String,
        unique: true,
    },
    user_pwd: {
        type: String,
    },
    user_reg_at: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("user", userSchema);