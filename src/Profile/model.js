const mongoose = require("mongoose");
const { v4 } = require("uuid");
const { Schema } = mongoose;


const profileSchema = new Schema({
    _id: { 
        type: String,
         default: v4()
    },
    firstName: { 
        type: String,
    },
    lastName: { 
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;