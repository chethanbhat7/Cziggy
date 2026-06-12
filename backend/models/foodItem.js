const mongoose=require('mongoose')
const restaurant = require('./restaurant')

const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Food Item name"],
        trim:true,
        maxLenght:[100,"Food Item cannot be more than 100"]  
    },
    price:{
        type:Number,
        required:[true,"Please Enter the Price"],
        maxLenght:[5,"Price cannot be more than 5"],
        default:0.0
    },
    description:{
        type:String,
        required:[true,"Please Enter Food Item Description"],
        trim:true,
    },
    ratings:{
        type:Number,
    },
    images:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    menu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Menu"
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Food Item Stock"],
        maxLength:[5,"Food stock cannot be more than 5"],
        default:0
    },
    restaurant:{
        type:mongoose.Schema.Restaurant,
        ref:"Restaurant"
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true     
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('foodItem',foodSchema)