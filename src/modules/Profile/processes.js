const Profile = require("./model");
const { v4 } = require("uuid");
const chechIfDocumentExist = require("../../utils/documentExist");
const QRCode = require("qrcode");



async function createProfile(details){
    let _id = v4()
    let newProfile= await Profile.create({ _id, ...details});
    return newProfile;
};

async function generateQRCode(details){
    let detailString  = JSON.stringify(details);
    //generate and print qrcode to the terminal
    QRCode.toString(detailString, {type: "terminal"}, (err, QRCode) => {
        if(err){
            return console.log("Error occured");
        } 
        console.log(QRCode)
    })
}

async function fetchProfiles (page){
    page = page - 1
    let allProfiles =  await Profile.find()
                .sort({"firstName": "ASC"})
                .limit(10)
                .skip(10 * page);
    //get the total pages at 10 documents per page
    let total = Math.round((await Profile.count())/10);
    console.log(total)
    return {allProfiles, total};
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

module.exports = { deleteProfile, createProfile, fetchProfiles, verifyUserProfile, generateQRCode }
