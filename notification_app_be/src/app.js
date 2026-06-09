const express =
  require("express");

const cors =
  require("cors");

const notificationRoutes =
  require(
    "./routes/notificationRoutes"
  );

const Log = require("../../logging_middleware/Log");

const app = express();

app.use(cors());
app.use(express.json());

// Mandatory Logging Middleware
app.use(async (req, res, next) => {
  try {
    await Log("express", "info", "notification_app_be", `Request: ${req.method} ${req.url}`);
  } catch (err) {
    console.error("Middleware Logging Error:", err.message);
  }
  next();
});

app.use(
  "/api/notifications",
  notificationRoutes
);

app.get("/", (req, res) => {
  res.send(
    "AffordMed Notification Backend Running"
  );
});

module.exports = app;