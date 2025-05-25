const mongoose=require('mongoose')
const { default: MyApartments } = require('../../client/my-app/src/components/apartments/MyApartments')
const MyFavorite=mongoose.Schema({
    myApartments:{
        type:mongoose.Schema.ObjectId,
        ref:'MyApartments',
        required:true,
    },
    myFavorite:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })
module.exports=mongoose.model('MyFavorite',MyFavorite)