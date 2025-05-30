const mongoose=require('mongoose')
const apartment=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    neighborhood:{
        type:String,
        required:false,
    },
    street:{
        type:String,
        required:true,
    },
    building:{
        type:Number,
        required:true,
    },
    floor:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    img:{
        type:[String],
        default:[],
        required:false,
    },
    size:{
        type:Number,
        required:true,
    },
    numOfRooms:{
        type:Number,
        required:true,
    },
    airDirections:{
        type:String,
        enum:['0','1','2','3','4'],
        required:true,
    },
    discreption:{
        type:String,
        required:true,
    },
    options:{
        type:[String],
        required:true,
    },
    isConfirm:{
        type:Boolean,
        default:false
    },
    purchaseConfirm:{
        type:Boolean,
        default:false
    },
},{timestamps:true})
module.exports=mongoose.model('Apartment',apartment)