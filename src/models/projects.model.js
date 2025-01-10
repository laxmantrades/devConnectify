const mongoose=require("mongoose")
const projectSchema= new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    projectImage:{
        type:String
        
    },
    skills:{
        type:[String]
    },
    description:{
        type:String
    },
    creator:{
        type:Object
    }

})
module.exports=mongoose.model("project",projectSchema)