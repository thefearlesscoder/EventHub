// firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json' // Update the path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
