const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Course = require('./course');

const RelatedUrl = sequelize.define('relatedUrl',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING
    },
    url:{
        type:Sequelize.STRING
    },
    image:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING
    },
    course_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: Course,
            key: 'id'
        }
    }
})  

module.exports = RelatedUrl;