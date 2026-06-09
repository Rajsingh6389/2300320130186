const axios = require("axios");
const Log = require("../../../logging_middleware/Log");

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

let cachedToken = null;

const getAuthToken = async () => {
  if (cachedToken) return cachedToken;
  try {
    if (!process.env.AUTH_EMAIL || !process.env.AUTH_CLIENT_ID) {
      console.warn("Auth Warning: Missing AUTH environment variables.");
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
    console.error("Auth Error:", error.message);
    return null;
  }
};

const fetchNotifications = async (
  page = 1,
  limit = 10,
  notification_type
) => {
  let token = await getAuthToken();
  const params = {
    page,
    limit,
  };

  if (notification_type) {
    params.notification_type =
      notification_type;
  }

  try {
    await Log("backend", "info", "service", `Fetching notifications from external API (Page: ${page}, Limit: ${limit})`);
    
    const response = await axios.get(
      API_URL,
      {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      }
    );

    return response.data;
  } catch (error) {
    // If unauthorized, clear token and retry once
    if (error.response?.status === 401) {
      cachedToken = null;
      token = await getAuthToken();
      const retryResponse = await axios.get(
        API_URL,
        {
          params,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      return retryResponse.data;
    }
    throw error;
  }
};

module.exports = {
  fetchNotifications,
};