const express = require('express');
const User = require('../../model/user');
const router = express.Router();
const Validator = require('../../validator');
const bcrypt = require('bcrypt');

router.post('/signin', async(req,res)=>{
    try{
        const findEmail = await User.findAll({ where:{ email : req.body.email}});
        if(findEmail.length !== 0){
            res.status(200).json({msg: "Email Exists"})
        }else{
            const getValidBody = await Validator.validateReq(req.body,{
                name: "string",
                email: "string",
                password: "string"
            })
            const finalBody ={
                name: getValidBody.name,
                email: getValidBody.email,
                password: bcrypt.hashSync(getValidBody.password,10) 
            }
            const storeData = await User.create(finalBody);
            res.status(200).json({msg: "User Created"});
        }
    }catch(e){
        res.json({error: e})
    }    
})


module.exports = router;