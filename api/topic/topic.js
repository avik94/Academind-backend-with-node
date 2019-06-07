const express = require('express');
const Topic = require('../../model/topic');
const Course = require('../../model/course');
const router = express.Router();
const Validator = require('../../validator');

router.post('/add-topic', async(req,res)=>{
    try{
        const findTopic = await Topic.findAll({ where:{ name: req.body.name }});
        if(findTopic.length !== 0){
            res.json({ msg:"Topic Already Existed!" })
        }else{
            const getValidityBody = await Validator.validateReq(req.body, {
                name: "string",
                image: "string"
            })
            const storeTopic = await Topic.create(req.body);
            res.status(200).json({msg: "Topic Created Successfully!"})
        }       
    }catch(e){
        res.status(200).json({error: e})
    }
})

// Edit
router.post('/update-topic/:id', async(req,res)=>{
    try{
        const findTopic = await Topic.findAll({ where:{ id: req.params.id }});
        if(findTopic.length !== 0){
            const getValidityBody = await Validator.validateReq(req.body, {
                name: "string",
                image: "string"
            })
            const storeTopic = await Topic.update(req.body, {
                where:{
                    id: req.params.id
                }
            });
            res.status(200).json({ msg: "Topic Updated Successfully!"})
        }else{
            res.json({ msg:"Please Choose Proper Topic!" });            
        }       
    }catch(e){
        res.status(200).json({error: e})
    }
})

// Delete
router.post('/delete/:id', async(req,res)=>{
    try{
        const findTopic = await Topic.findAll({ where:{ id: req.params.id }});
        if(findTopic.length !== 0){
            const deleteCourse = await Course.destroy({ where:{ topic_id: req.params.id}});
            const deleteTopic = await Topic.destroy({
                where:{
                    id: req.params.id
                }
            });
            res.status(200).json({ msg: "Topic Deleted Successfully!"})
        }else{
            res.json({ msg:"Please Choose Proper Topic!" });            
        }       
    }catch(e){
        res.status(200).json({error: e})
    }
})



module.exports = router;