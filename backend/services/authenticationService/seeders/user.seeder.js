const User = require("../models/user");

const seedUsers = async () => {
    const users = [
        {
            username: "admin",
            email: "admin@gmail.com",
            password: "admin123",

        },
        {
            username: "user",
            email: "user@gmail.com",
            password: "user123",

        }
    ]

    for (const user of users) {
        await User.updateOne(
            { email: user.email },
            { $setOnInsert: user },
            { upsert: true }

        );
    }

    console.log("Users Finished Seeding");



}

module.exports = seedUsers;

