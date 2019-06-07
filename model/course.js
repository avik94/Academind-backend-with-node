const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Topic = require('./topic');

const Course = sequelize.define('course',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
    },
    image:{
        type:Sequelize.STRING,
    },
    date:{
        type:Sequelize.STRING,
    },
    description:{
        type:Sequelize.STRING,
    },
    author:{
        type:Sequelize.STRING,
    },
    body:{
        type:Sequelize.TEXT,
    },
    videoUrl:{
        type:Sequelize.STRING,
    },
    udemyUrl:{
        type:Sequelize.STRING,
    },
    udemyUrl:{
        type:Sequelize.STRING,
    },
    topic_Id:{
        type:Sequelize.INTEGER,
        references:{
            model: Topic,
            key: 'id'
        }
    }
}) 

module.exports = Course;