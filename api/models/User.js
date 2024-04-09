import moogoose  from "mongoose";

const userSchema=new moogoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


export const User=moogoose.model("User",userSchema)