const express = require('express');
const person = express.Router()
const usercontroler = require ('../controler/control.js')

person.post('/post',usercontroler.create)
person.post('/login',usercontroler.login)
person.post('/forgot',usercontroler.forgot)
person.post('/forgotpass',usercontroler.forgotpass)


module.exports=person