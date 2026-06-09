require("dotenv").config();

const Log = require("../../logging_middleware/Log");

const app =
  require("./app");

const PORT =
  process.env.PORT ||
  3000;

app.listen(PORT, async () => {
  console.log(
    `Server running on port ${PORT}`
  );
  await Log("backend", "info", "system", `Server started on port ${PORT}`);
});