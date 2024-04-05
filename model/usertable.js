const mongoose = require ('mongoose')
const user = new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
    },
})

const userresult = new mongoose.model("userdetail",user)
module.exports = userresult