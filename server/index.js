
const cors = require("cors");
const express = require('express');
const session = require("express-session");

require('./db/config');
const User = require("./db/user");
const Project = require("./db/project");
const user = require("./db/user");
const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: "secret"
}));
let userInfo = {};
app.post("/Login", async (req, resp) => {
    console.warn("called");
    userInfo = {};
    let userdata = await User.findOne(req.body).select("-password -_id");
    console.warn("login status"+userdata)
    if (userdata) {
       
        userInfo = userdata;
        resp.send(userdata);
    }

});


app.post("/Checkuser", async (req, resp) => {
    
    resp.send(userInfo);

});

app.post("/useradd", async (req, resp) => {

    // console.warn(req.body);
    let useradd = new User(req.body);
    let result = await useradd.save();

    // console.warn(req.body.devl_id);
    // let userProjectResult= await User.findOneAndUpdate({_id:req.body.devl_id},{   $push: {project_id:result._id}}   ,{new :true});
    // console.warn(userProjectResult); 
    resp.send(result);
});

app.post("/projectadd", async (req, resp) => {

    console.warn(req.body);
    let projectadd = new Project(req.body);
    let result = await projectadd.save();

    console.warn(req.body.devl_id);
    let userProjectResult = await User.updateMany({ _id: req.body.devl_id }, { $push: { project_id: result._id } }, { new: true });
    console.warn(userProjectResult);
    resp.send(result);
});

app.post("/getonlyproject", async (req, resp) => {
    let projectdata = await Project.find(req.body);

    resp.send(projectdata);

});

app.post("/getproject", async (req, resp) => {
    let projectdata = await Project.find().populate('devl_id');

    resp.send(projectdata);

});

app.post("/getuser", async (req, resp) => {
    let userdata = await User.find().select("-password ");

    resp.send(userdata);

});

app.post("/getdevl", async (req, resp) => {
    let userdata = await User.find({ role: "developer" }).select("-password ");

    resp.send(userdata);

});

app.post("/getuserproject", async (req, resp) => {
    let userdata = await User.find(req.body).populate('project_id').select("project_id -_id");
    resp.send(userdata);

});

app.post("/getuserprojectstatus", async (req, resp) => {
    let userdata = await User.find(req.body).populate('project_id').select("project_id -_id");
    resp.send(userdata);

});
app.post("/getuserdates", async (req, resp) => {
    let userdata = await User.find(req.body).populate('project_id').select("userevent project_id -_id");
    resp.send(userdata);

});

app.post("/getusermessage", async (req, resp) => {
    let userdata = await User.find(req.body).populate('project_id', 'message name').select("project_id -_id");
    resp.send(userdata);

});

app.post("/messageadd", async (req, resp) => {

    console.warn("its calling");
    let messageProjectResult = await Project.findOneAndUpdate({ _id: req.body.project_id }, { $push: { message: req.body.message } }, { new: true });
    resp.send(messageProjectResult);
});

app.post("/eventadd", async (req, resp) => {

    console.warn("event calling");
    let userEventResult = await user.findOneAndUpdate({ name: req.body.name }, { $push: { userevent: req.body.event } }, { new: true });
    resp.send(userEventResult);
});

app.listen(3001);