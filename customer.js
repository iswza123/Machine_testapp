// Example: customer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Customer = sequelize.define('Customer', {
    account_number: { type: DataTypes.STRING, primaryKey: true },
    issue_date: { type: DataTypes.DATE, allowNull: false },
    interest_rate: { type: DataTypes.FLOAT, allowNull: false },
    tenure: { type: DataTypes.INTEGER, allowNull: false },
    emi_due: { type: DataTypes.FLOAT, allowNull: false }
}, {
    tableName: 'customers',
    timestamps: false
});

module.exports = Customer;
