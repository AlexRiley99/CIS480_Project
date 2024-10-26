/****************SERVER SIDE CODE*******************/
const functions = require('firebase-functions');

exports.myFunction = functions.https.onRequest((req, res) => {
    //server-side code here
    res.send("Hello from Cloud Functions!");
});
