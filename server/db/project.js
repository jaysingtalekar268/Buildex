const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    desc:String,
    pstatus:String,
    catg:String,
    devl_id:[{
        type:mongoose.Schema.Types.ObjectId,
     ref:'users'
    }]
});

module.exports = mongoose.model("projects",userSchema);