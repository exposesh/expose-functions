const crypto = require("crypto");

/**
 * Verifies the signature of a GitHub Webhook.
 *
 * @param {Object} req - The HTTP request object.
 * @return {boolean} - Returns true if the signature is valid, false otherwise.
 */
function verifySignature(req) {
  const signature = `sha256=${crypto
      .createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex")}`;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(req.headers["x-hub-signature-256"]));
}

module.exports = {
  verifySignature,
};
