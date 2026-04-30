const express = require('express');

const router = express.Router();

router.get('/secure', (req, res) => {
    //Middleware already enforced auth

    const userInfo = req.securityContext
        ? req.securityContext.getUserInfo()
        : null;

    res.json({
        message: 'Secure data',
        currentUser: req.currentUser,
        user: userInfo
    });
});

module.exports = router;