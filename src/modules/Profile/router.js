const router = require("express").Router()
const { createNewProfile, fetchAllProfiles, deleteAProfile, searchProfile } = require("./handler")


router.post("/profile", createNewProfile);

router.get("/profiles", fetchAllProfiles );

router.delete("/profile/:_id", deleteAProfile);

router.get("/search", searchProfile);

module.exports = router;
