const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./connection');

const userRouter = require('./api/user/user');
const topicRouter = require('./api/topic/topic');
const courseRouter = require('./api/course/course');

const User = require('./model/user');
const Topic = require('./model/topic');
const Course = require('./model/course');
const RelatedUrl = require('./model/relatedUrl');
const app = express();
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


app.use('/user', userRouter);
app.use('/topic', topicRouter);
app.use('/course', courseRouter);

app.get('/database', (req,res)=>{
    try{
        sequelize.sync()
        res.json({msg:"Table Created Successfully!"})
    }catch(e){
        console.log(e)
    }
})

app.use((req,res)=>{
    res.json({msg: "path not find"})
})

module.exports = app;