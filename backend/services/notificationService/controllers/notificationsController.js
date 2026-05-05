const {Notification} = require("..models/notification")
const getAllUserNotifications = async (req, res) => {
    try {
        const notifications = Notification.find();
        console.log("fetched notifications", notifications);
        res.status(200).json({notifications});
        

    } catch (error) {
        console.log("Server Error Coudnt get all the USer Notifications", error);
        res.status(500).json({error: "Server Error"});
    }


}

const createNotification = async (req, res) => {
    try {
        
        const { recepientId, type, message} = req.body;
        const newNotification = new Notification({recepientId, type, message});
        await newNotification.save();
        console.log("Notification created");
        res.status(200).json({newNotification});

    } catch (error) {
        console.log("Error in creating the notification", error);
        res.status(500).json({error: "Cannot Create Notification Object"});
    }
}


const getNotification = async (req, res, key) => {
    try {
        const notification = Notification.findById(key);
        if (notification) {
            res.status(200).json(notification)
        } else {
            console.log("Notification Not Found");
            res.status(500).json("Notificatio Not Found");
        }

    } catch (error) {
        res.status(500).json({"Server Error": error});
    }
    
}

const deleteNotification = async (req, res, key) => {
    try {
        const notificationDeleted = Notification.findByIdAndDeleta(key);
        console.log("THe Notification Deleted");
        res.status(200).json(notificationDeleted);

    } catch (error) {
        res.status(500).json({"Server Error": error});

        }

    

    
}


const deleteAllNotifications = async (req, res) => {
    const recepientId = req.params.recepientId;
    try {
        const notificationsDeleted = await Notification.deleteMany();
        res.status(200).json({success: true, message: "All notifications deleted", deletedCount: notificationsDeleted});

    } catch (error){
        res.status(500).json({error: 'Server Error'});

    }
}

module.exports = {
    getAllUserNotifications,
    deleteAllNotifications,
    deleteNotification,
    getNotification,
    createNotification
};