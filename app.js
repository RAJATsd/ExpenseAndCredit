const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');


const app= express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
});

app.use(authRoutes);
app.use(expenseRoutes);


mongoose.connect('mongodb://localhost:27017/dailyDeal',{useNewUrlParser:true})
.then(result =>{
    console.log('connected to db');
    app.listen(1234);
})
.catch(err=>{
    console.log(err);
});
