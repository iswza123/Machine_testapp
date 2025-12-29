const { Sequelize } = require('sequelize');
const path = require('path');

// Use SQLite database stored locally
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite')
});

// Test connection
sequelize.authenticate()
    .then(() => console.log('SQLite Database connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
