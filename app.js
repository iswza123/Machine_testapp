const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const sequelize = require('./config/db');
const Customer = require('./models/customer');
const Payment = require('./models/payment');

const customersRouter = require('./routes/customers');
const paymentsRouter = require('./routes/payments');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/customers', customersRouter);
app.use('/payments', paymentsRouter);

// Sync DB and start server
sequelize.sync().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
});
