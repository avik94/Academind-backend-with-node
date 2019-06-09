const Sequelize = require('sequelize');
const sequelize = new Sequelize('academind', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

//connection-checking....
sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});
  
module.exports = sequelize;