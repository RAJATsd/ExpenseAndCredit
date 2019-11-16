const mongoose = require("mongoose");

const schema = mongoose.Schema;

const creditSchema = new schema({
    amount : {
        type:Number,
        required: true
    },
    source : {
        type: String,
        required:true
    },
    day: {
        type: Number,
        required:true 
    },
    month:{
        type:Number,
        required:true
    },
    year : {
        type: Number,
        required: true
    },
    emailId : {
        type: String,
        required:true
    },
    date : {
        type : Date,
        required : true
    }
}); 

module.exports = mongoose.model('credit',creditSchema);