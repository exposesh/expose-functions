const {
  checkIfStarred,
} = require("./checkIfStarred");
const {
  checkIfSponsor,
} = require("./checkIfSponsor");
const {
  fetchGitHubSSHKeys,
} = require("./fetchGitHubSSHKeys");
const logger = require("firebase-functions/logger");

exports.verifyGitHubUserAndFetchSSHKeys = async (req, res) => {
  const username = req.query.username;

  try {
    const isSponsor = await checkIfSponsor(username);
    const hasStarred = await checkIfStarred(username);

    if (!isSponsor && !hasStarred) {
      return res.status(404).send("GitHub user not found as sponsor or stargazer in our records");
    }

    const sshKeys = await fetchGitHubSSHKeys(username);

    res.status(200).json({
      sshKeys,
      sponsor: isSponsor,
    });
  } catch (error) {
    logger.error("Error processing request:", error);
    res.status(500).send("Internal server error");
  }
};

