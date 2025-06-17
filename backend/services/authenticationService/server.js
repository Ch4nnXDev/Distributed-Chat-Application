const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const cookieSession = require('cookie-session');
const user = require('./models/user');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();
const app = express();

app.use(cookieSession({name: 'auth-session', maxAge: 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_KEY]}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, 
(accessToken, refreshToken, profile, done) => {
    user.findOrCreate({ googleId : profile.id }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            user.create({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
        }
    });
    
    
   
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
      
      res.redirect(`http://localhost:3000/login/success`);
    }
);
  
app.get('/auth/failure', (req, res) => {
    res.send('Failed to authenticate.');
});
  
app.listen(4000, () => console.log('Auth Service running on http://localhost:4000'));