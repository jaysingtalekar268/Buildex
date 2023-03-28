const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:root123@buildex.t5zyfgm.mongodb.net/buildex?retryWrites=true&w=majority",{
    useNewUrlParser: true,
     useUnifiedTopology: true
}).then(()=>{
    console.warn("db connection successfully");
});



