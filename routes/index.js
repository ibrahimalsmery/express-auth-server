const auth = require('../middlewares/auth');
const router = require('express').Router();
// welcome route 
router.get('/', (req, res) => {
    res.status(200).json({
        server: "node_auth_server_app"
    })
})
// include auth routes
router.use('/auth', require('./auth'));
// protected route
router.get('/user', auth, (req, res) => {
    const response = {
        user_id: req.user._id,
        user_name: req.user.user_name,
        user_email: req.user.user_email,
        user_reg_at: req.user.user_reg_at
    }
    return res.status(200).json(response);
});
module.exports = router;