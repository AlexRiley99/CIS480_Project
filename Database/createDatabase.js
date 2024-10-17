/*Firebase Configuration*/
// Import functions 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

//Add SDKs for Firebase products:
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCjp08hg0zwmkeXKl0Z1d5jMvj0Njfq2dM",
  authDomain: "cis480-project.firebaseapp.com",
  databaseURL: "https://cis480-project.firebaseio.com",
  projectId: "cis480-project",
  storageBucket: "cis480-project.appspot.com",
  messagingSenderId: "513907575321",
  appId: "1:513907575321:web:a4c98b75f760871a7a7888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.firestore(); //Use firestore for database operations

//Counter
    //Using transactions makes it so that if multiple users
    //add something to the database, it won't mess up the counter

    //Initialize counter if it doesn't exist
    async function initializeCounter(counterRef){
        const counterDoc = await getDoc(counterRef);
        if(!counterDoc.exists()){
            await setDoc(counterRef, { count: 0 });
        }
    }

    //Add document with auto-incremented ID
    async function addDocumentWithAutoIncrement(collectionName, data) {
    const counterRef = db.collection('counters').doc(`${collectionName}Counter`);

    await initializeCounter(counterRef);

    await db.runTransaction(async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        const newCount = counterDoc.data().count + 1;

        transaction.update(counterRef, { count: newCount });
        transaction.set(db.collection(collectionName).doc(), {
            ...data,
            [`${collectionName}ID`]: newCount // Set the auto-incremented ID
        });

        return newCount;
    });

    console.log(`Added document to ${collectionName} with auto-incremented ID. ID = ${newCount}`);
}


//Add data to Firestore
(async () => {
        //Plans
        await await addDocumentWithAutoIncrement('Plans', {
            PlanID: newCount,
            PlanName: "Silver Plan",
            PlanCost: 19.99
        });

        await await addDocumentWithAutoIncrement('Plans', {
            PlanID: newCount,
            PlanName: "Gold Plan",
            PlanCost: 29.99
        });

        await await addDocumentWithAutoIncrement('Plans', {
            PlanID: newCount,
            PlanName: "Platinum Plan",
            PlanCost: 39.99
        });

        await addDocumentWithAutoIncrement('Plans', {
            PlanID: newCount,
            PlanName: "Diamond Plan",
            PlanCost: 49.99
        });
        
        //Member
        await addDocumentWithAutoIncrement('Members', {
            MemberID: newCount,
            FirstName: "Alex",
            LastName: "Riley",
            Phone: "843-714-8829",
            Email: "aleril0593@students.ecpi.edu",
            JoinDate: new Date(),
            Address1: "311 Macgregor Dr",
            City: "Summerville",
            State: "South Carolina",
            ZipCode: "29486",
            PlanID: 1
        });
    
        //Children
        await addDocumentWithAutoIncrement('Children', {
            ChildID: newCount,
            FirstName: "Marceline",
            LastName: "Riley",
            EnrollmentDate: new Date(),
            Allergies: "None",
            EpiPen: false,
            Disabilities: "None",
            Accommodations: "None",
            MemberID: 1
        });
        
        await addDocumentWithAutoIncrement('Children', {
            ChildID: newCount,
            FirstName: "Jovie",
            LastName: "Riley",
            EnrollmentDate: new Date(),
            Allergies: "None",
            EpiPen: false,
            Disabilities: "None",
            Accommodations: "None",
            MemberID: 1
        });

        //EmergencyContacts
        await addDocumentWithAutoIncrement('EmergencyContacts', {
            ContactID: newCount,
            FirstName: "Derek",
            LastName: "Riley",
            Phone: "812-345-4383",
            Relationship: "Father",
            ChildID: 1
        });
        
        await addDocumentWithAutoIncrement('EmergencyContacts', {
            ContactID: newCount,
            FirstName: "Derek",
            LastName: "Riley",
            Phone: "812-345-4383",
            Relationship: "Father",
            ChildID: 1
        });

        //AuthorizedAdults
        await addDocumentWithAutoIncrement('AuthorizedAdults', {
            AdultID: newCount,
            FirstName: "Derek",
            LastName: "Riley",
            Phone: "812-345-4383",
            Relationship: "Father",
            ChildID: 1
        });

        await addDocumentWithAutoIncrement('AuthorizedAdults', {
            AdultID: newCount,
            FirstName: "Derek",
            LastName: "Riley",
            Phone: "812-345-4383",
            Relationship: "Father",
            ChildID: 2
        });

        //Classes
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Monday",
            ClassTime: "0900",
            ClassInstructor: "Alice"
        });

        //ClassEnrollments
        await addDocumentWithAutoIncrement('Classes', {
            EnrollmentID: newCount,
            ClassID: 1, 
            MemberID: 1
        });
        
        //JournalEntry
        await addDocumentWithAutoIncrement('JournalEntries', {
            EntryID: newCount,
            EntryDate: new Date(),
            Entry: "Treadmill 20 minutes, machines 30 minutes, spin bike 20 minutes",
            MemberID: 1
        });
        
        //LoginInfo
        await addDocumentWithAutoIncrement('JournalEntries', {
            loginID: newCount,
            User: "AlexR99",
            Pass: "Password1*",
            MemberID: 1
        });
})();
        
        


