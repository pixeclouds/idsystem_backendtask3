const Profile = require("./model");
const { v4 } = require("uuid");
const chechIfDocumentExist = require("./../utils/documentExist");
const { deleteOne } = require("./model");


async function createProfile(details){
    let _id = v4()
    let newProfile= await Profile.create({ _id, ...details});
    return newProfile;
};

async function fetchProfiles (){
    //create profile
    let allProfiles =  await Profile.find({});
    return allProfiles;
};

async function deleteProfile(_id){
    await chechIfDocumentExist(Profile, { _id });
    await Profile.deleteOne({ _id });
};

async function verifyUserProfile(details) {
    let  { firstName, lastName } = details;
    let verifiedProfile = await Profile.find({ firstName, lastName  });
    return verifiedProfile;
};

module.exports = { deleteProfile, createProfile, fetchProfiles, verifyUserProfile }
