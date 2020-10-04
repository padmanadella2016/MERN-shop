const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var path= require('path');
let User = require('../models/userModel');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:' + err));
})
router.route('/add').post((req, res) =>{
    const  name = req.body.name;
    const email= req.body.email;
    const  password = req.body.password;
    const user = new User({
                name,
                email,
                password,
            });
           
            user.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error:' + err));
});
router.post('/signin', async(req, res) =>{
    const signinUser = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });
    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            })
    }else
    {
        res.status(401).send({msg:'Invalid Email or Password'});
    }
})
router.post('/register', async(req, res) =>{
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const newUser = await user.save();
   
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            
        })
    } else
    {
        res.status(401).send({msg:'Invalid usedata'});
    }
   });
router.get("/createadmin", async (req, res) =>{
    try {
        const user = new User({
            name:'padma',
            email:'padmanadella.2016@gmail.com',
            password:'1234',
            isAdmin:true
});
const newUser = await user.save();
res.send(newUser);
    }
    catch(error){
        res.send({msg:error.message});
    }
  
})

 module.exports =  router;
