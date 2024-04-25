const {
  verifySignature,
} = require("./verifySignature");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

exports.handleGitHubSponsorsWebhook = async (req, res) => {
  if (!verifySignature(req)) {
    logger.error("Signature mismatch");
    res.status(401).send("Signature mismatch");
    return;
  }

  try {
    const {action, sender} = req.body;
    if (["created", "cancelled"].includes(action)) {
      const db = admin.firestore();
      const userRef = db.collection("sponsors").doc(sender.login);

      if (action === "created") {
        logger.info(`User ${sender.login} started sponsors`);
        await userRef.set({
          timestamp: admin.firestore.Timestamp.fromDate(new Date()),
        });
      } else if (action === "cancelled") {
        logger.info(`User ${sender.login} cancelled sponsors`);
        await userRef.delete();
      }
      res.status(200).send("Sponsors webhook processed successfully");
    } else {
      logger.error("Not a sponsors creation or cancellation event");
      res.status(400).send("Not a sponsors creation or cancellation event");
    }
  } catch (error) {
    logger.error("Failed to process sponsors webhook", error);
    res.status(500).send("Internal server error");
  }
};
