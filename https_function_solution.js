The problem was resolved by explicitly converting the data object to a plain JavaScript object before writing to Firestore. This ensures that Firestore can correctly serialize the data.  It appears that the original data object, potentially due to nested objects or special characters, caused issues in Firestore's internal serialization process.

```javascript
// https_function_solution.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addData = functions.https.onCall(async (data, context) => {
  // Convert data to plain object
  const plainData = JSON.parse(JSON.stringify(data));
  await admin.firestore().collection('myCollection').add(plainData);
  return { success: true };
});
```