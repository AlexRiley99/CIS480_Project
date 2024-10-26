const {initializeApp} = require("firebase/app");
const {errorHandler} = require("helpers");
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
let firestoreDb;//Connection to firestore database

const initializeFirebaseApp = () => {
  try{
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore();
    return app;
  } 
  catch(error){
    errorHandler(error, "firebase-initializerFirebaseApp");
  }
};

const uploadProcessedData = async () => {
  const dataToUpload ={
    key1:"test",
    key2:123,
    key3:new Date(),
  };
  try{
    const document = doc(firestoreDb, "Testing", "2");
    //doc takes 3 arguments: firestoreDb, Name of Collection, Unique ID
    let dataUpdated = await setDoc()//Push data into database
  } 
  catch(error){
    errorHandler(error, "firebase-uploadProcessedData");
  }
};

const getFirebaseApp = () => app;

module.exports = {
  initializeFirebaseApp,
  getFirebaseApp,
  uploadProcessedData,
};

