
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const bcrypt = require('bcryptjs')
const userRoutes = require('./routes/routes.js');
const Configpassport = require('./config/passport');
const express = require('express');
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
connectDB();
app.use('/user', userRoutes);
app.use(passport.initialize());

  

Configpassport();

app.post('/signup', async(req, res)=> {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
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

app.post('/logout', (req, res)=> {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
  res.json({message: "Logged out"});
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
      const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 });
      res.redirect(`http://localhost:5173/search`);

    }
);
  
app.listen(4000, () => console.log('Auth Service running on http://localhost:4000'));