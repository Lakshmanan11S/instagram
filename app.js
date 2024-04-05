const express = require ('express');
const mongoose = require ('mongoose');
const PORT = 6000;
const bodyparser = require ('body-parser');
const userrouter = require ('./router/router.js')
const app = express()
app.use(express.json())
app.use(bodyparser.json())
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL)
.then(data=>console.log("mongo db is connected"))
.catch(error=>console.log("mongo db is not connected"))

app.get('/',(req,res)=>{
    res.send("WELCOME TO INSTAGRAM")

})
app.use('/api',userrouter)
app.listen(PORT,()=>console.log("server is running on:",PORT))