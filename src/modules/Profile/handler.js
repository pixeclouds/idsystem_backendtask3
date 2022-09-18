const validateData = require("../../utils/validate");
const { createProfile, fetchProfiles, deleteProfile, verifyUserProfile, generateQRCode } = require("./processes")

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
        await generateQRCode(newProfile)
        res.json(newProfile);

    } catch (err) {
        res.json({Error: err });
    };
    
};
async function fetchAllProfiles (req, res){
    try {
        //curren to page to  fetch
        let page = req.params.page;
        let { total, allProfiles } = await fetchProfiles(page);
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

async function verifyProfile(req, res){
    try {
        let details = req.body;
        let verified =  await verifyUserProfile(details);
        //check if empty result is returned
        if (!verified.length){
            err =  "Profile verification failed"
            throw err;
        };
        res.json({Mssg: "Profile verification successful"});
    } catch (err) {
        res.json({Error: err});
    };
};


module.exports = { createNewProfile, fetchAllProfiles, deleteAProfile, verifyProfile    }