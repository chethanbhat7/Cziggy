//Import package

const mongoose =require('mongoose')

const validator=require('validator')

const bcrypt=require('bcryptjs')

const jwt=require('jsonwebtoken')

const crypto=require('crypto')
const { kMaxLength } = require('buffer')

//Create Schema

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,'Name cannot exceed 30 characters']
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Password"],
        minLength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,"Confirm password"],
        validate:{
            validator:function(el){
                return el===this.password
            },
            message:"Passwords donot match"
        }
    },
    phoneNumber:{
        type:String,
        required:true,
        match:[/^[0-9]{10}$/,'Enter valid phone number']
    },
    role:{
        type:String,
        enum:["user","admin"],
        dafault:"user"
    }
    
})