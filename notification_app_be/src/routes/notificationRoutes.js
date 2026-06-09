const express =
  require("express");

const router =
  express.Router();

const {
  getNotifications,
  getPriorityInbox,
} = require(
  "../controllers/notificationController"
);

router.get(
  "/",
  getNotifications
);

router.get(
  "/priority",
  getPriorityInbox
);

module.exports = router;