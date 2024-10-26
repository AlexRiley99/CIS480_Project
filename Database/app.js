//Firebase configuration
const {firebaseConfig} = require("./firebase");
const {initializeApp} = require("./firebase");
const {getFirestore, doc, setDoc, getDoc, getDocs, collection} = require("firebase/firestore");

//Import password validation function from SignUp.js

//Add existing documents
async function addExistingDocuments(collectionName){
    //Create reference to document in "Counters" collection
    //Document name is based on collection name (ex. MembersCounter)
    const counterRef = db.collection('Counters').doc(`${collectionName}Counter`);

    await initializeCounter(counterRef);

    const snapshot = await db.collection(collectionName).get();
    let count = 0;

    //loop through existing documents
    snapshot.forEach(async (doc) => {
        count += 1; //increment count for each document
        const data = doc.data();
    });

    //Create new document with auto-incremented ID
    await db.collection(collectionName).doc().add({
        ...data,
        [`${collectionName}ID`]: count
    });

        //Update counter document with new count
        await counterRef.add({ count: count }, {merge:true});
        console.log(`Added document to ${collectionName} with auto-incremented ID. ID = ${count}`);
}

//Auto-increment ID numbers for new documents
async function addDocumentWithAutoIncrement(collectionName, data) {
    // Initialize counter if it doesn't exist
    async function initializeCounter(counterRef) {
        const counterDoc = await getDoc(counterRef);
        // Check if the counter document exists; if not, create it
        if (!counterDoc.exists()) {
            await addDoc(counterRef, { count: 0 }); // Initialize count to 0
        }
    }
    //Create reference to document in "Counters" collection
    //Document name is based on collection name (ex. MembersCounter)
    const counterRef = db.collection('Counters').doc(`${collectionName}Counter`);

    await initializeCounter(counterRef);

    //Transactions ensure that multiple users can create documents at the same time
    const newCount = await db.runTransaction(async (transaction) => {
        //Get current count
        const counterDoc = await transaction.get(counterRef);
        const newCount = counterDoc.data().count + 1; //Increment count by 1

        //Update counter document with new count
        transaction.update(counterRef, { count: newCount });
        //add new document
        transaction.add(db.collection(collectionName).doc(), {
            ...data,
            [`${collectionName}ID`]: newCount // add the auto-incremented ID
        });

        return newCount;
    });

    console.log(`Added document to ${collectionName} with auto-incremented ID. ID = ${newCount}`);
    return newCount;
}

//New Member Submission Handler
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload
    const Plan = document.getElementById('plans').value;
    const FirstName = document.getElementById('firstName').value;
    const LastName = document.getElementById('lastName').value;
    const Email = document.getElementById('email').value;
    const Phone = document.getElementById('phone').value;
    const Username = document.getElementById('username').value;
    const Password = document.getElementById('password').value;
    const ConfirmPassword = document.getElementById('confirmPassword').value;
    const CardNumber = document.getElementById('cardNumber').value;
    const Addr1 = document.getElementById('addr1').value;
    const Addr2 = document.getElementById('addr2').value;
    const City = document.getElementById('city').value;
    const State = document.getElementById('state').value;
    const ZipCode = document.getElementById('zip').value;
    const Error = document.getElementById('message');

    //Get PlanID based on plan selection
    if(Plan.value == 'silverPlan'){
        PlanID == "Plans/1";
    }
    else if(Plan.value == 'goldPlan'){
        PlanID == "Plans/2";
    }
    else if(Plan.value == 'platinumPlan'){
        PlanID == "Plans/3";
    }
    else if(Plan.value == 'diamondPlan'){
        PlanID == "Plans/4"
    }

    if (!Plan){//Check that Plan and State are not null
        Error.textContent = "*Must select a plan before submitting";
        return; 
    }
    else if(!Select){
        Error.textContent = "*Must select a state before submitting";
        return;
    }

    try {
        // Create a new document in the "Testing" collection
        await db.collection("Members").doc(newCount).add({
            PlanID: db.doc(PlanID),//Create reference to Plan document
            FirstName: String(FirstName),
            LastName: String(LastName),
            Email: String(Email),
            Phone: String(Phone),
            JoinDate: new Date(),



        });
        document.getElementById('message').textContent = "Data uploaded successfully!";
    } catch (error) {
        console.error("Error uploading data: ", error);
        document.getElementById('message').textContent = "Error uploading data.";
    }
});
