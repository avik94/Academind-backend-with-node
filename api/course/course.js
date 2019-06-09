const express = require('express');
const router = express.Router();
const Course = require('../../model/course');
const RelatedUrl = require('../../model/relatedUrl');
const Validator = require('../../validator');

router.post('/', async(req,res)=>{
    
    try{
        reqBody = {
            name: req.body.name,
            image: req.body.image,
            date: req.body.date,
            description: req.body.description,
            author: req.body.author,
            body: req.body.body,
            udemyUrl: req.body.udemyUrl,
            videoUrl: req.body.videoUrl,
            topic_Id: req.body.topic_Id,
        }
        delete reqBody.udemyUrl
        if(req.body.relatedUrl.length !== 0){
            const validator = await Validator.validateReq(reqBody,{
                name: "string",image:"string",date: "string",description: "string",author: "string",body:"string",videoUrl:"string",topic_Id: "number"                    
            })
            const relatedUrl = await Validator.validateRelatedUrl(req.body.relatedUrl,{
                name: "string", image: "string", description: "string", url: "string"
            })
            const urlDatas = req.body.relatedUrl;
            reqBody.udemyUrl = req.body.udemyUrl;
            const storeData = await Course.create(reqBody);        
            const id = storeData["id"];

            for (let eachData of urlDatas){
                eachData.course_id = id;
                const storeRelatedUrl = await RelatedUrl.create(eachData);     
            }
            res.status(200).json({msg: "Created successfully"});
        }else{
            console.log("hello")
            const validator = await Validator.validateReq(reqBody,{
                name: "string",image:"string",date: "string",description: "string",author: "string",body:"string",videoUrl:"string",topic_Id: "number"
            })
            reqBody.udemyUrl = req.body.udemyUrl;
            const storeData = await Course.create(reqBody);
            const id = storeData["id"];
            urlData = {
                name: null,
                image: null,
                description: null,
                url: null,
                course_id: id
            }
            const storeRelatedUrl = await RelatedUrl.create(urlData);
            res.status(200).json(reqBody);            
        }
    }catch(err){
        res.json({error:err})
    }
})
module.exports = router;
