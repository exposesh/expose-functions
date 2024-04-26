const axios = require("axios");

const functionUrls = [
  process.env.VERIFY_GITHUB_USER_AND_FETCH_SSH_KEYS_URL,
];

exports.warmer = async () => {
  console.log("Starting to warm up functions...");
  for (const url of functionUrls) {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: process.env.ACCESS_TOKEN,
        },
        params: {
          isWarming: "true",
        },
      });
      console.log(`Warming up ${url}: Success with status ${response.status}`);
    } catch (error) {
      console.error(`Error warming up ${url}: ${error.message}`);
    }
  }
};
