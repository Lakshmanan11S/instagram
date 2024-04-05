const mongoose = require ('mongoose');

const data = new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    Email:{
        type:String,
    },
    Mobileno:{
        type:String,
    },
    otp:{
        type:String,
    },
})

const result = new mongoose.model("personaldetail",data)
module.exports = result