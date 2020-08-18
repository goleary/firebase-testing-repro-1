const firebase = require("@firebase/testing");
const fs = require("fs");

const projectId = `whatever`;

const COLLECTION_NAME = "collection";

const testApp = firebase.initializeTestApp({
  projectId,
  auth: { uid: "alice", email: "alice@example.com" },
});

const adminApp = firebase.initializeAdminApp({ projectId });
/*
beforeAll(() =>
  firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync("../firestore/firestore.rules", "utf8"),
  })
);
*/
afterAll(() => Promise.all(firebase.apps().map((app) => app.delete())));

test("should allow admin writing/reading to/from linkDetails collection", async () => {
  await await firebase.assertSucceeds(
    adminApp
      .firestore()
      .collection(COLLECTION_NAME)
      .doc("test")
      .set({ test: "test" })
  );
  await await firebase.assertSucceeds(
    adminApp.firestore().collection(COLLECTION_NAME).doc("test").get()
  );
});
