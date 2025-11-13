
const connectDB = require('./db/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const bcrypt = require('bcryptjs')

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
dotenv.config();
const app = express();
app.use(cookieParser());
connectDB();

app.use(passport.initialize());


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

app.post('/signup', async(req, res)=> {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!existingUser) {
      const newUser = await User.create({email, password: hashedPassword});
      const token = jwt.sign({userId: newUser._id, email: newUser.email}, process.env.JWT_SECRET, {expiresIn: "1d"});
      res.cookie("token", token, {

        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ message: "User created" });

    } else {
      res.status(400).json({message: "User exists"});
    }
    

  } catch (error) {
    console.log("error")
  }

}) 

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/auth/failure' }),
    (req, res) => {
      const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
            maxAge: 60 * 60 * 1000 });
      res.redirect(`http://localhost:5173/chat`);

    }
);
  
app.get('/failure', (req, res) => {
    res.send('Failed to authenticate.');
});

app.get("/check", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    res.json({loggedIn: true})
  } else {
    res.json({loggedIn: false})
  }

})
  
app.listen(4000, () => console.log('Auth Service running on http://localhost:4000'));