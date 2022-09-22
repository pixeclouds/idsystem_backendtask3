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

async function fetchProfiles (page, pageSize){
    page = page - 1 //zero indexing of array
    let allProfiles =  await Profile.find()
                .sort({"firstName": "ASC"})
                .limit(pageSize)
                .skip(pageSize * page);
    //get the total pages for the given number of 
    // documents (pagesize) per page
    let total = Math.round((await Profile.count())/pageSize);
    return {allProfiles, total};
};

async function deleteProfile(_id){
    await chechIfDocumentExist(Profile, { _id });
    await Profile.deleteOne({ _id });
};


async function searchForProfile (value) {
    let exists = await chechIfDocumentExist({firstName: value});
    if(exists){
        result = await Profile.find({firstName: value});
        return result;
    }else{
        return Error
    }
    
}

module.exports = { deleteProfile, createProfile, fetchProfiles, generateQRCode, searchForProfile }
