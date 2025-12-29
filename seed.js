const Customer = require('./models/customer');
const sequelize = require('./config/db');

(async () => {
    await sequelize.sync({ force: true }); // recreate tables

    await Customer.create({
        account_number: '12345',
        issue_date: new Date('2023-01-01'),
        interest_rate: 10.5,
        tenure: 12,
        emi_due: 500
    });

    console.log('Sample customer added');
    process.exit();
})();
