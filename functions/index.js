const {
  verifyToken,
} = require("./src/verifyToken");
const admin = require("firebase-admin");
const {
  onRequest,
} = require("firebase-functions/v2/https");
const {
  onSchedule,
} = require("firebase-functions/v2/scheduler");

admin.initializeApp();

const handleGitHubStarsWebhookFunction = require("./src/handleGitHubStarsWebhook.js");
const handleGitHubSponsorsWebhookFunction = require("./src/handleGitHubSponsorsWebhook.js");
const verifyGitHubUserAndFetchSSHKeysFunction = require("./src/verifyGitHubUserAndFetchSSHKeys.js");
const warmerFunction = require("./src/warmer.js");

exports.handleGitHubStarsWebhook = onRequest({
  region: "europe-west9",
}, async (req, res) => {
  await handleGitHubStarsWebhookFunction.handleGitHubStarsWebhook(req, res);
});

exports.handleGitHubSponsorsWebhook = onRequest({
  region: "europe-west9",
}, async (req, res) => {
  await handleGitHubSponsorsWebhookFunction.handleGitHubSponsorsWebhook(req, res);
});

exports.verifyGitHubUserAndFetchSSHKeysFunction = onRequest({
  region: "europe-west9",
}, verifyToken(async (req, res) => {
  await verifyGitHubUserAndFetchSSHKeysFunction.verifyGitHubUserAndFetchSSHKeys(req, res);
}));

exports.warmer = onSchedule({
  region: "europe-west3",
  schedule: "* * * * *",
}, async (event) => {
  await warmerFunction.warmer(event);
});
