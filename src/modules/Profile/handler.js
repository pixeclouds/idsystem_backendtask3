const validateData = require("../../utils/validate");
const encrypt = require("../../utils/encrypt")
const { createProfile, fetchProfiles, deleteProfile, generateQRCode, searchForProfile } = require("./processes");
const Profile = require("./model");

async function createNewProfile (req, res) {
    try {
        let details = req.body;
        //validate user input
        let result = await validateData(details);
        if(!result.valid){
            throw  result.err
        };
        //create new profile and  generate qrcode
        let newProfile = await createProfile(details);
        let encryptedData  = encrypt(newProfile)
        await generateQRCode(encryptedData)

        res.json(newProfile);

    } catch (err) {
        res.json({Error: err });
    };
    
};

//implements pagition on fetching all profiles
async function fetchAllProfiles (req, res){
    try {
        let page = req.query.page;  //current page to fetch 
        let pageSize = req.query.pageSize; //number of documents per page
        console.log(page, pageSize)
        let { total, allProfiles } = await fetchProfiles(page,  pageSize);
        res.json({
            "Message": `Displaying page ${page} of ${total} total pages.`,
            allProfiles
        })
    } catch (err) {
        res.json({Error: err });
    }
}

async function deleteAProfile(req, res) {
    try {
        let { _id } = req.params;
        await deleteProfile(_id);
        res.json({ mssg: "Profile deleted successfully"})
    } catch (err) {
        res.json({Error: err });
    }
};


async function searchProfile(req, res){
    try {
        let value = req.query.firstName;
        let result = await searchForProfile(value);
        console.log(result)
        if(result==Error){
            throw err
        }
        res.json(result);
    } catch (err) {
        res.json({Error: "Profile not found"});
    }
}

module.exports = { createNewProfile, fetchAllProfiles, deleteAProfile, searchProfile  }