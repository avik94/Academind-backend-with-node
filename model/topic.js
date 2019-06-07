const Sequelize = require('sequelize');
const sequelize = require('../connection');

const Topic = sequelize.define('topic',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    }
}) 

module.exports = Topic