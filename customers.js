const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
