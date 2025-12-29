const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./customer');

const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customer_account: { type: DataTypes.STRING, allowNull: false },
    payment_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    payment_amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'SUCCESS' }
}, {
    tableName: 'payments',
    timestamps: false
});

Customer.hasMany(Payment, { foreignKey: 'customer_account' });
Payment.belongsTo(Customer, { foreignKey: 'customer_account' });

module.exports = Payment;
