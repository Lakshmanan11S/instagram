const express = require ('express')
const usermodel = require ('../model/model.js')
const usertable = require ('../model/usertable.js')
const nodemailer = require ('nodemailer')


exports.create = async(req,res)=>{
    try{
        const persondetails = new usermodel({
    firstname :req.body.firstname,
    lastname : req.body.lastname,
    Email : req.body.Email,
    Mobileno : req.body.Mobileno,
    Otp : null
 })
 await persondetails.save()
 const firstname = req.body.firstname;
 const lastname = req.body.lastname;
 const Mobileno = req.body.Mobileno;
const username = firstname.slice(0,4) + lastname.slice(5,10)
const password = firstname + "#"+Mobileno.slice(6,10)
const iddetails = new usertable({
    username:username,
    password:password
})
await iddetails.save()
res.send({
    message:"user details are saved",
    data:username,
    password
})
const transporter = nodemailer.createTransport({
    service:'gmail',
    host:"smpt.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.Email,
        pass:process.env.PASS
    }
})
const mailoption = {
    from:process.env.Email,
    to:'lakshmanan@elonnativesystem.com',
    subject:'username and password details',
    text:`username:${username},password:${password}`
}
transporter.sendMail(mailoption,function(error,info){
    if(error){
         res.status(500).json({message:"mail send failed"})
    }else{
        res.status(200).json({message:"mail send successfully"})
    }
})
 }catch(error){
     res.status(500).send({message:error.message})
 }

}


exports.login = async(req,res)=>{
    try{
    const username = req.body.username
    const password = req.body.password
    const userfound = await usertable.findOne({username:username})
    if(!userfound){
        return res.status(500).send("username is not found")
    }else if(password ===userfound.password){
        return res.status(200).json({message:"log in successful"})
    }else{
        return res.status(500).json({message:"user verification not success"})
    }
}catch(error){
    return res.status(500).json({message:"server error"})
}
}

exports.forgot = async (req,res)=>{

    function generateOTP(limit){
       var  digits = '0123456789'
       let OTP = ''
       for(let i=0;i<limit;i++){
       OTP+=digits[Math.floor(Math.random()*10)]}

       return OTP;
}
const OTP = generateOTP(6)
const firstname = req.body.firstname
const newModel = await usermodel.findOne({firstname:firstname})
 newModel.otp = OTP
 await newModel.save()
 
if(!newModel){
     res.status(500).json({message:"User Not Found"})
}else {
     res.status(200).json({message:"otp sent successfully"})
}

const transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.Email,
        pass:process.env.pass
    }
})

const mailoption = {
    from:process.env.Email,
    to:process.env.to,
    subject:"forgot otp",
    text:`YOUR OTP IS:${OTP}`
}

try{
transporter.sendMail(mailoption,function(error,info){
    if(error){
        res.status(500).json({message:"otp do not send mail"})
    }else{
        res.status(200).json({message:"otp are send at mail"})
    }
})



}catch(error){
    res.status(500).send({message:"server error",error})
}
}

exports.forgotpass = async (req,res)=>{
    try{
    const forgototp = req.body.otp
    const username = req.body.username
    const newpassword = req.body.password
    const userfound = await usermodel.findOne({otp:forgototp})
    if(!userfound){
        res.status(500).json({message:"userfound invalid"})}
        if(!username){
            res.status(500).json({message:"username not found"})
        }
        
       const updatepassword = await  usertable.findOne({ username:username})
       updatepassword.password = newpassword
       console.log(newpassword)
       await  updatepassword.save()
   if(!updatepassword){
    res.status(500).json({message:"password not updated"})
   }else{
    res.status(200).json({message:"new password updated"})
   }

}catch(error){
    res.status(500).send({message:"server error",error})
}
 }
