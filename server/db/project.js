const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    desc: String,
    pstatus: String,
    catg: String,
    deadline: Date,
    created: Date,
    message:[
        {
        message_body: String,
        message_sender: String
    
    }],
devl_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
}]
});

module.exports = mongoose.model("projects", userSchema);