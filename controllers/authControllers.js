const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postSignup = (req,res,next) => {
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email : email})
    .then(userInfo => {
        if(userInfo){
          res.status(302).json({message:"This person has already registered"})
        }
        else{
            bcrypt.hash(password,12)
            .then(hashedPw => {
                const user = new User({
                    username : username,
                    email : email,
                    password : hashedPw                    
                });
                user.save()
                .then(result => {
                    res.status(201).json({message:"Person successfuly registered"});
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
            }
        })
    .catch(err =>{
        console.log(err);
    });
}

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email:email})
    .then(user =>{
        if(!user){
            res.status(417).json({message:'User not found'});
        }
        else{
            bcrypt.compare(password,user.password)
            .then(matching=>{
                if(!matching)
                {
                    res.status(406).json({message:'Invalid Password'});
                }
                const token = jwt.sign({email:user.email,userId:user._id.toString()
                },'merastudentkasectret',
                {expiresIn:'1h'});
                res.status(200).json({token:token,userId:user._id.toString()});
            })
            .catch(err=>{
                console.log(err);
            });
        }
    })
    .catch(err=>{
        console.log(err);
    });
}

