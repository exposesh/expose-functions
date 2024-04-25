const {
  verifySignature,
} = require("./verifySignature");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

exports.handleGitHubStarsWebhook = async (req, res) => {
  if (!verifySignature(req)) {
    logger.error("Signature mismatch");
    res.status(401).send("Signature mismatch");
    return;
  }

  try {
    const {action, starred_at, repository, sender} = req.body;
    if (["created", "deleted"].includes(action)) {
      const db = admin.firestore();
      const repoRef = db.collection("stars").doc(repository.name);
      const userRef = repoRef.collection("users").doc(sender.login);

      if (action === "created") {
        logger.info(`User ${sender.login} starred ${repository.name}`);
        await userRef.set({
          timestamp: admin.firestore.Timestamp.fromDate(new Date(starred_at)),
        });
      } else if (action === "deleted") {
        logger.info(`User ${sender.login} unstarred ${repository.name}`);
        await userRef.delete();
      }
      res.status(200).send("Webhook processed successfully");
    } else {
      logger.error("Not a star creation or deletion event");
      res.status(400).send("Not a star creation or deletion event");
    }
  } catch (error) {
    logger.error("Failed to process webhook", error);
    res.status(500).send("Internal server error");
  }
};
