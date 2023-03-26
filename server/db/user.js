const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    phone:String,
    project_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'projects'
    }]
});

module.exports = mongoose.model("users",userSchema);