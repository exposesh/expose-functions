const admin = require("firebase-admin");
const axios = require("axios");
const logger = require("firebase-functions/logger");

/**
 * @param {string} username
 */
async function fetchGitHubSSHKeys(username) {
  const cacheKey = `github_ssh_keys_${username}`;
  const cacheDocRef = admin.firestore().collection("cache").doc(cacheKey);

  try {
    const response = await axios.get(`https://github.com/${username}.keys`);
    const sshKeys = response.data.split("\n").filter(Boolean);

    await cacheDocRef.set({
      sshKeys: sshKeys,
    });

    return sshKeys;
  } catch (error) {
    logger.error(`Error fetching GitHub SSH keys for ${username}: ${error.message}`);
    const cachedData = await cacheDocRef.get();

    if (cachedData.exists) {
      return cachedData.data().sshKeys;
    } else {
      throw error;
    }
  }
}

module.exports = {
  fetchGitHubSSHKeys,
};
