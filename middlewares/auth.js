const jwt = require('jsonwebtoken');
const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['user-access-token'];
    if (!token) {
        return res.status(403).json({ error: "token is required." });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const User = require('../models/user');
        req.user = await User.findById(decoded.user_id);
        if (!req.user) return res.status(401).json({ error: "User not found." });
    } catch (error) {
        return res.status(401).json({ error: 'Somthing wrong with token.' });
    }
    return next();
}
module.exports = verifyToken;