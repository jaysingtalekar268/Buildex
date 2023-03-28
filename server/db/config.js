const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/buildex");


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:root123@buildex.t5zyfgm.mongodb.net/?retryWrites=true&w=majority/buildex";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }).then(()=>{
    console.warn("db connected")
});


