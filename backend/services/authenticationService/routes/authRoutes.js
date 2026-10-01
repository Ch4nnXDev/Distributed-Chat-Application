const express = require("express");
const passport = require("passport");
const authenticate = require("../middleware/authenticate");
const {
    signUpController,
    logoutController,
    getUserByGoogleIdController,
    getAllUsersController,
    getMe,
    googleCallbackController
} = require("../controllers/AuthenticationController");

const router = express.Router();

router.post("/signup", signUpController);

router.post("/logout", logoutController);

router.get("/users", getAllUsersController);

router.get("/user/:googleId", getUserByGoogleIdController);

router.get("/me", authenticate, getMe);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login"
    }),
    googleCallbackController
);

module.exports = router;