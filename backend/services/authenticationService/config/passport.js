const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');



const Configpassport = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback'

}, 
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });



    if (!user) {
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,

      });
      await user.save();
    }
    return done(null, user); 
  } catch (error) {
    console.error("Google strategy error:", error);
    return done(error, null);
  }
}));
};

module.exports = Configpassport;