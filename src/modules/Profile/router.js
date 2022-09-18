const router = require("express").Router()
const { createNewProfile, fetchAllProfiles, deleteAProfile, verifyProfile } = require("./handler")


router.post("/profile", createNewProfile);

router.get("/profiles/:page", fetchAllProfiles );

router.delete("/profile/:_id", deleteAProfile);

router.post("/verify", verifyProfile);

module.exports = router;
