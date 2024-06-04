const admin = require("firebase-admin");

/**
 * @param {string} username
 */
async function checkIfStarred(username) {
  const starsCollection = admin.firestore().collection("stars");
  const querySnapshot = await starsCollection.listDocuments();
  let userExists = false;

  for (const docRef of querySnapshot) {
    const usersCollection = docRef.collection("users");
    const userDoc = await usersCollection.doc(username).get();
    if (userDoc.exists) {
      userExists = true;
      break;
    }
  }

  return userExists;
}

module.exports = {
  checkIfStarred,
};
