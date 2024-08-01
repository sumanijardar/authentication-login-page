var mongoose = require("mongoose");
require("dotenv").config();

const connectDB = ()=>{

    console.log("mongoose is connceted");

    // console.log(process.env.MONGO_PATH);

    return mongoose.connect(process.env.MONGO_PATH);

}

module.exports= connectDB;