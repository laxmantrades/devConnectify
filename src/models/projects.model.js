const mongoose=require("mongoose")
const projectSchema= new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    projectImage:{
        type:String,
        default:"https://trekmag.co.uk/wp-content/uploads/What-is-a-Project-1-scaled-1.jpg"
        
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