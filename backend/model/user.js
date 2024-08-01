var mongoose = require("mongoose");

var signupSchema = new mongoose.Schema({
    name     :{type : String , require:true},
    username :{type : String , require:true},
    password :{type : String , require:true},
    role     :{type : String , require:true}
},{versionKey:false});

//creating table in mongodb
var collection = new mongoose.model("user",signupSchema);

module.exports= collection;