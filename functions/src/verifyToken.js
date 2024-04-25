const logger = require("firebase-functions/logger");

/**
 * Verifies the token.
 *
 * @param {Function} handler - The handler function to be executed if the token is valid.
 * @return {Function} - Returns a function that takes a request and a response object, verifies the token, and executes the handler if the token is valid.
 */
function verifyToken(handler) {
  return async (req, res) => {
    const token = req.headers.authorization;

    if (!token || token !== process.env.ACCESS_TOKEN) {
      logger.error("Unauthorized - Invalid token");
      return res.status(200).json({
        error: "Unauthorized - Invalid token",
      });
    }

    await handler(req, res);
  };
}

module.exports = {
  verifyToken,
};
