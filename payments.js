// const express = require('express');
// const router = express.Router();
// const Payment = require('../models/payment');
// const Customer = require('../models/customer');

// // Make a payment
// router.post('/', async (req, res) => {
//     const { customer_account, payment_amount } = req.body;

//     try {
//         const customer = await Customer.findByPk(customer_account);
//         if (!customer) return res.status(404).json({ error: 'Customer not found' });

//         const payment = await Payment.create({ customer_account, payment_amount });
//         res.json({ message: 'Payment successful', payment });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Get payment history
// router.get('/:account_number', async (req, res) => {
//     const { account_number } = req.params;

//     try {
//         const payments = await Payment.findAll({ where: { customer_account: account_number } });
//         res.json(payments);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/payments", (req, res) => {
  res.json({ status: "API running" });
});

app.post("/api/payments", (req, res) => {
  const { loanId, amount } = req.body;

  if (!loanId || !amount) {
    return res.status(400).json({ message: "Missing fields" });
  }

  res.json({ success: true, loanId, amount });
});

app.listen(5000, () => console.log("Server running on port 5000"));
