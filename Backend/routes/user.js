const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  signUp,
  login,
  logout,
  getUserDetails,
  updateUserProfile,
  updateProfilePic,
} = require("../controllers/user");

const verifyAuth = require("../middlewares/auth");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

router.get("/user/:id", getUserDetails);
router.put("/user/:id", updateUserProfile);

router.post(
  "/profile-pic",
  verifyAuth,
  upload.single("image"),
  updateProfilePic
);

module.exports = router;
