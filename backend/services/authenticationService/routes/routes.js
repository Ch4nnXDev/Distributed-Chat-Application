const express = require('express');
const user = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await user.find({});
        if (!users) {
            return res.status(404).json({ message: "No users found"});
        }

        return res.status(200).json({ users });
        

    } catch (error) {
        console.log('Error fetching users', error);


    
    }
})

module.exports = router;