//For Firebase configuration and initialization
const {initializeApp} = require("firebase/app");
const {getFirestore, doc, setDoc} = require("firebase/firestore");

const{
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_APP_ID
} = process.env;

const firebaseConfig ={
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID
};

let app;
let db;//Connection to firestore database

const initializeFirebaseApp = () => {
    app = initializeApp(firebaseConfig);
    db = getFirestore();
    return app;
};

const uploadProcessedData = async () => {
  const dataToUpload ={
    key1:"test",
    key2:123,
    key3:new Date(),
  };
    const document = doc(db, "Testing", "2");
    //doc takes 3 arguments: db, Name of Collection, Unique ID
    let dataUpdated = await setDoc(document, dataToUpload)//Push data into database
  
};

const getFirebaseApp = () => app;


