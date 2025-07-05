const express = require('express');
const ensureAuth = require('../Middlewares/Auth');
const router = express.Router();

router.get('/',ensureAuth,(req, res) => {
    res.send(200).json([
        {
            name:"mobile",
            price: 20000,
        }, 
        {
            name:"laptop",
            price: 50000,
        },
        {
            name:"tablet",
            price: 30000,
        }
    ])
});

module.exports = router;
