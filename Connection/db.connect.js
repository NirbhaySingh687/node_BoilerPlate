const mongoose = require("mongoose")

exports.connectDb =async () => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/testing");
        console.log(`Successfully connect to Database`)
    }catch (err) {
        console.log(`Database Err--`,err)
    }
}