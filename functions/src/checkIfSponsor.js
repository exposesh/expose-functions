const admin = require("firebase-admin");

/**
 * @param {string} username
 */
async function checkIfSponsor(username) {
  const sponsorsRef = admin.firestore().collection("sponsors").doc(username);
  const sponsorDoc = await sponsorsRef.get();
  return sponsorDoc.exists;
}

module.exports = {
  checkIfSponsor,
};
