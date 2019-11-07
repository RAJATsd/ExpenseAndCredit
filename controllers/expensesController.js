const expenseModel = require('../models/expense');
const creditModel = require('../models/credits')

exports.postExpense = (req,res,next) => {
    const date = req.body.date;
    const amount = req.body.amount;
    const label = req.body.label;
    const email = req.body.email;

    const month = date.split("/")[1];
    const year = date.split("/")[2];
    const day = date.split("/")[0];

    const newExpense = new expenseModel({
        amount:amount,
        label:label,
        emailId:email,
        day:day,
        month:month,
        year:year
    });
    newExpense.save()
    .then(result=>{
        res.status(202).json({result:result});
    })
    .catch(err=>{
        res.status(500).json({message:"Some error occured"});
    });
}

exports.postCredit = (req,res,next) => {
    const date = req.body.date;
    const amount = req.body.amount;
    const source = req.body.label;
    const email = req.body.email;

    const month = date.split("/")[1];
    const year = date.split("/")[2];
    const day = date.split("/")[0];

    const newCredit = new creditModel({
        amount:amount,
        source:source,
        emailId:email,
        day:day,
        month:month,
        year:year
    });

    newCredit.save()
    .then(result=>{
        res.status(202).json({result:result});
    })
    .catch(err=>{
        res.status(500).json({message:"Some error occured"});
    });
}

exports.deleteAll = (req,res,next) => {
    const email = req.body.email;

    expenseModel.deleteMany({emailId:email})
    .then(res=>{
        creditModel.deleteMany({emailId:email})
        .then(res=>{
            res.status(200).json({message:"Deleted All Of The Credits and Expenses Successfully"});
        })
        .catch(err=>{
            res.status(500).json({message:"Some error occured"});
        });
    })
    .catch(err=>{
        res.status.json({message:"Some error occured"});
    });
}

exports.showExpenses = (req,res,next) => {
    const email = req.body.email;

    expenseModel.find({emailId:email}).sort({month:-1})
    .then(resultingArray=>{
        res.status(200).json({expenses:resultingArray});
    })
    .catch(err=>{
        res.status(500).json({message:"Some error occured in the server side"});
    });
}

exports.showCredits = (req,res,next) => {
    const email = req.body.email;

    creditModel.find({emailId:email}).sort({month:-1})
    .then(resultingArray=>{
        res.status(200).json({credits:resultingArray});
    })
    .catch(err=>{
        res.status(500).json({message:"Some error occured in the server side"});
    });    
}
