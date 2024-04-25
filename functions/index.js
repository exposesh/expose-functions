const {
  verifyToken,
} = require("./src/verifyToken");
const admin = require("firebase-admin");
const {
  onRequest,
} = require("firebase-functions/v2/https");

admin.initializeApp();

const handleGitHubStarsWebhookFunction = require("./src/handleGitHubStarsWebhook.js");
const handleGitHubSponsorsWebhookFunction = require("./src/handleGitHubSponsorsWebhook.js");
const verifyGitHubUserAndFetchSSHKeysFunction = require("./src/verifyGitHubUserAndFetchSSHKeys.js");

exports.handleGitHubStarsWebhook = onRequest({
  region: "europe-west9",
}, async (req, res) => {
  handleGitHubStarsWebhookFunction.handleGitHubStarsWebhook(req, res);
});

exports.handleGitHubSponsorsWebhook = onRequest({
  region: "europe-west9",
}, async (req, res) => {
  handleGitHubSponsorsWebhookFunction.handleGitHubSponsorsWebhook(req, res);
});

exports.verifyGitHubUserAndFetchSSHKeysFunction = onRequest({
  region: "europe-west9",
}, verifyToken(async (req, res) => {
  verifyGitHubUserAndFetchSSHKeysFunction.verifyGitHubUserAndFetchSSHKeys(req, res);
}));

