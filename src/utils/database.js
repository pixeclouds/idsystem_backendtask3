const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/qrProfile";

async function connectDB () {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected")
    }).catch(err => {
        console.log(err)
    })
    ;
};

module.exports = connectDB;