const express = require('express');
const router = express.Router();
const Course = require('../../model/course');
const RelatedUrl = require('../../model/relatedUrl');
const Topic = require('../../model/topic');

router.get('/', async(req,res)=>{    
    try{
        const topic = await Topic.findAll();
        let final =[];
        for(let item of topic){
            const course = await Course.findAll({where: {topic_Id: item['id']}});
            let getCourse = [];
            for(let courseItem of course){
                const relatedUrl = await RelatedUrl.findAll({where: 
                    {course_id: courseItem["id"]}})
                let course = {
                        name: courseItem["name"],
                        image: courseItem["image"],
                        relatedUrl: relatedUrl.map(el=>{
                            return {
                                name: el['name'],
                                image: el['image'],
                                description: el['description'],
                                url: el['url']
                            }
                        })
                }     
                getCourse.push(course);
            }
            const a = {
                name: item["name"],
                image: item["image"],
                course: getCourse
            }
            final.push(a);
        }
        res.json(final)
    }catch(e){
        res.json({error: e})
    }


})

module.exports = router;