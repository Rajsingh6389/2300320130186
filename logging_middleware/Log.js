const axios = require("axios");

const LOG_API =
  "http://4.224.186.213/evaluation-service/logs";

let cachedToken = null;

const getAuthToken = async () => {
  if (cachedToken) return cachedToken;
  try {
    if (!process.env.AUTH_EMAIL || !process.env.AUTH_CLIENT_ID) {
      console.warn("Logger Warning: Missing AUTH environment variables.");
      return null;
    }
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/auth",
      {
        email: process.env.AUTH_EMAIL,
        name: process.env.AUTH_NAME,
        rollNo: process.env.AUTH_ROLL_NO,
        accessCode: process.env.AUTH_ACCESS_CODE,
        clientID: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET
      }
    );
    cachedToken = response.data.access_token;
    return cachedToken;
  } catch (error) {
    console.error("Logger Auth Error:", error.message);
    return null;
  }
};

async function Log(
  stack,
  level,
  packageName,
  message
) {
  let token = await getAuthToken();
  const payload = {
    stack,
    level,
    package: packageName,
    message
  };

  try {
    const response = await axios.post(
      LOG_API,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : ""
        }
      }
    );

    return response.data;

  } catch (error) {
    // If unauthorized, clear token and retry once
    if (error.response?.status === 401) {
      cachedToken = null;
      token = await getAuthToken();
      
      try {
        const retryResponse = await axios.post(
          LOG_API,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : ""
            }
          }
        );
        return retryResponse.data;
      } catch (retryError) {
        console.error("Logger Retry Error:", retryError.response?.data || retryError.message);
        return null;
      }
    }

    console.error(
      "Logger Error:",
      error.response?.data ||
      error.message
    );

    return null;
  }
}

module.exports = Log;