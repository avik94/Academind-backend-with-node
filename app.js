const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./connection');

const userRouter = require('./api/user/user');
const topicRouter = require('./api/topic/topic');
const courseRouter = require('./api/course/course');
const getDataRouter = require('./api/get-data/all-data');

const User = require('./model/user');
const Topic = require('./model/topic');
const Course = require('./model/course');
const RelatedUrl = require('./model/relatedUrl');
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


app.use('/user', userRouter);
app.use('/topic', topicRouter);
app.use('/course', courseRouter);
app.use('/data', getDataRouter);

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