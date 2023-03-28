const mongoose = require("mongoose");

//mongoose.connect("mongodb://127.0.0.1:27017/buildex");
/*mongoose.connect("mongodb://admin:root123@buildex.ptyyouq.mongodb.net/?directConnection=true");*/



/*const { MongoClient, ServerApiVersion } = require('mongodb');*/
const uri = "mongodb+srv://sdidd:root123@buildex.t5zyfgm.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);
/*const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/
