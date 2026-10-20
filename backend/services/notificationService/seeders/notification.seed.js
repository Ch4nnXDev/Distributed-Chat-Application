const Notification = require("../models/notification");

const seedNotifications = async () => {

    const responseObj = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/internal/users`);

    if (!responseObj.ok) {
        throw new Error("response error");
    }

    const data = await responseObj.json();

    const userIds = data.users.map(user => user._id);

    if (!userIds) {
        await Notification.create({
            recepientId: userIds[0],
            type: "normal",
            content: "Test Notification",
            isRead: false
        })
    }

    console.log("test notification created successfully");

}

module.exports = seedNotifications;