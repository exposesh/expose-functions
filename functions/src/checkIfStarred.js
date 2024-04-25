const admin = require("firebase-admin");

/**
 * @param {string} username
 */
async function checkIfStarred(username) {
  const starsRef = admin.firestore().collectionGroup("users").where(admin.firestore.FieldPath.documentId(), "==", username);
  const starsQuerySnapshot = await starsRef.get();
  return !starsQuerySnapshot.empty;
}

module.exports = {
  checkIfStarred,
};
