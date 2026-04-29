const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/secure', authMiddleware, (req, res) => {
    const userInfo = req.securityContext.getUserInfo();

    res.json({
        message: 'Secure data',
        user: userInfo
    });
});

module.exports = router;