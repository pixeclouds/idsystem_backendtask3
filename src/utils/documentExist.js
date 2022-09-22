const Profile = require("../modules/Profile/model");

async function chechIfDocumentExist(query){
    let document =  await Profile.findOne({...query });
    if (!document || !document._id){
        return false;
    };
    return true;
};

module.exports = chechIfDocumentExist;