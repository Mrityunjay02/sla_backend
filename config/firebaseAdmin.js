const admin = require("firebase-admin");

// ✅ Use environment variable instead of file
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
