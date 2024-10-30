import admin from "firebase-admin";
// import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function generateTestIdToken() {
  try {
    // Generate a custom token for a test user ID (use any unique user ID)
    const customToken = await admin.auth().createCustomToken("test-user-id");

    console.log("Custom Token:", customToken);

    // Now, verify the custom token to get an ID token
    const userCredential = await admin.auth().verifyIdToken(customToken);
    const idToken = userCredential.token;

    console.log("ID Token for testing:", idToken);
    return idToken;
  } catch (error) {
    console.error("Error generating token:", error);
  }
}

// Run the function
generateTestIdToken();
