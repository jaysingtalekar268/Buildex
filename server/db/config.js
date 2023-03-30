const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sdidd:root123@buildex.t5zyfgm.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
     useUnifiedTopology: true
}).then(()=>{
    console.warn("db connection successfully");
});



