const admin = require("firebase-admin");
const {
  onRequest,
} = require("firebase-functions/v2/https");

admin.initializeApp();

const handleGitHubStarsWebhookFunction = require("./src/handleGitHubStarsWebhook.js");

exports.handleGitHubStarsWebhook = onRequest({
  region: "europe-west9",
}, async (req, res) => {
  handleGitHubStarsWebhookFunction.handleGitHubStarsWebhook(req, res);
});
