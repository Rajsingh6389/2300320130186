const {
    fetchNotifications,
  } = require(
    "../services/notificationService"
  );
  
  const getPriorityNotifications =
    require(
      "../utils/priorityInbox"
    );
  
  const Log = require(
    "../../../logging_middleware/Log"
  );
  
  const getNotifications =
    async (req, res) => {
      try {
        const {
          page = 1,
          limit = 10,
          notification_type,
        } = req.query;
  
        await Log(
          "backend",
          "info",
          "controller",
          "Fetching notifications"
        );
  
        const data =
          await fetchNotifications(
            page,
            limit,
            notification_type
          );
  
        res.status(200).json(data);
  
      } catch (error) {
  
        await Log(
          "backend",
          "error",
          "controller",
          error.message
        );
  
        res.status(500).json({
          success: false,
          message:
            error.message,
        });
      }
    };
  
  const getPriorityInbox =
    async (req, res) => {
      try {
  
        await Log(
          "backend",
          "info",
          "controller",
          "Generating priority inbox"
        );
  
        const data =
          await fetchNotifications(
            1,
            10
          );
  
        const notifications =
          data.notifications ||
          data;
  
        const result =
          getPriorityNotifications(
            notifications,
            Number(
              req.query.top || 10
            )
          );
  
        res.status(200).json({
          success: true,
          notifications:
            result,
        });
  
      } catch (error) {
  
        await Log(
          "backend",
          "error",
          "controller",
          error.message
        );
  
        res.status(500).json({
          success: false,
          message:
            error.message,
        });
      }
    };
  
  module.exports = {
    getNotifications,
    getPriorityInbox,
  };