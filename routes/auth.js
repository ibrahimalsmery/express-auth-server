const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
function createToken(user_id) {
    return jwt.sign(
        { user_id },
        process.env.TOKEN_KEY,
        { expiresIn: '24h' }
    );
}
function authResponse(user_id, user_name, user_email, user_token) {
    return { user_id, user_name, user_email, user_token }
};
router.post('/register', async (req, res) => {
    try {
        let { user_name, user_email, user_pwd } = req.body;
        // validation
        if (!(user_name && user_email && user_pwd)) return res.status(400).json({ error: "All fields required." });
        // check if user exists
        const otheruser = await User.findOne({ user_email });
        if (otheruser) return res.status(409).json({ error: "User is already exists." });
        // hash password
        user_pwd = await bcrypt.hash(user_pwd, 10);
        // create user 
        let user = await User.create({ user_name, user_email: user_email.toLowerCase(), user_pwd });
        // create token 
        const token = createToken(user._id);
        return res.status(201).json(authResponse(user._id, user.user_name, user.user_email, token));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "somthing wrong." })
    }
})
router.post('/login', async (req, res) => {
    try {
        const { user_email, user_pwd } = req.body;
        if (!(user_email && user_pwd)) return res.status(400).json({ error: "All fields required." });
        const user = await User.findOne({ user_email });
        if (user && (await bcrypt.compare(user_pwd, user.user_pwd))) {
            // create new token 
            const token = createToken(user._id);
            return res.status(201).json(authResponse(user._id, user.user_name, user.user_email, token));
        } else {
            res.status(400).json({ error: "Password or Email is wrong." })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "somthing wrong." })
    }
})

module.exports = router;