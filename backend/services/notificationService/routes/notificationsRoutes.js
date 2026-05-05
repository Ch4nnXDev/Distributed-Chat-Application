const router = require('express').Router();
const NotificationController = require('../controllers/notificationsController');

router.post('/create', NotificationController.createNotification);

router.get('getAll', NotificationsController,getAllUserNotifications);
router.get('get/:key', NotificationsController.getNotification);
router.delete('delete/:key', NotificationController.deleteNotification);
router.delete('delete', NotificationController.deleteAllNotifications);

module.exports = router;