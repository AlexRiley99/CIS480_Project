/********Firebase Configuration*********/
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
const database = getFirestore(app); //Use firestore for database operations

/*********************************************************************/
//Functions
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
    return newCount;
}

//Get day of the week for class enrollment validation
function getDayOfWeek(date){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

//Validate class enrollments
async function canEnroll(classID){
    const classRef = doc(database, 'Classes', classID);
    const classDoc = await getDoc(classRef);

    if(!classDoc.exists()){
        console.error("Class does not exist.");
        return false;
    }

    const { MaxCapacity, EnrollmentDeadline, ClassDate } = classDoc.data();
    const currentEnrollments = await getEnrollmentsForClass(classID);

    //get current day
    const currentDay = getDayOfWeek(new Date());

    //check max capacity
    if (currentEnrollments.length >= MaxCapacity) {
        console.log("Cannot enroll: Maximum capacity reached.");
        return false;
    }

    //check if current day is past deadline
    const isPastDeadline = (currentDay === EnrollmentDeadline);

    if(isPastDeadline){
        console.log("Cannot enroll: Enrollment deadline has passed for this class. Please try again in 48 hours.");
        return false;
    }
    return true;
}

    
/******************************************************************/
//Add data to Firestore
(async () => {
    //Create an array of plans
    const plans = [
        { PlanName: "Silver Plan", PlanCost: 19.99 },
        { PlanName: "Gold Plan", PlanCost: 29.99 },
        { PlanName: "Platinum Plan", PlanCost: 39.99 },
        { PlanName: "Diamond Plan", PlanCost: 49.99 }
    ];
    // Function to add multiple plans
    async function addPlans() {
        try {
            // Create an array of promises using map
            const planPromises = plans.map(async (plan) => {
                // Call addDocumentWithAutoIncrement for each plan
                return await addDocumentWithAutoIncrement('Plans', plan);
            });

            // Wait for all promises to resolve
            const planIDs = await Promise.all(planPromises);
            console.log(`Plans added with IDs: ${planIDs}`);
        } catch (error) {
            console.error("Error adding plans:", error);
        }
    }
    // Call the function to add plans
    addPlans();
        

        //Members
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
            //Monday
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Water Aerobics",
            ClassDay: "Monday",
            ClassTime: "0900",
            ClassInstructor: "Alice",
            MaxCapacity: 20,
            EnrollmentDeadline: "Sunday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Jazzercise",
            ClassDay: "Monday",
            ClassTime: "1100",
            ClassInstructor: "Janice",
            MaxCapacity: 20,
            EnrollmentDeadline: "Sunday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Water Aerobics",
            ClassDay: "Monday",
            ClassTime: "1430",
            ClassInstructor: "Jordan",
            MaxCapacity: 20,
            EnrollmentDeadline: "Sunday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "HIIT",
            ClassDay: "Monday",
            ClassTime: "1530",
            ClassInstructor: "Jason",
            MaxCapacity: 20,
            EnrollmentDeadline: "Sunday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Monday",
            ClassTime: "1700",
            ClassInstructor: "Aaron",
            MaxCapacity: 20,
            EnrollmentDeadline: "Sunday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "HIIT",
            ClassDay: "Monday",
            ClassTime: "1900",
            ClassInstructor: "Becca",
            MaxCapacity: 20,
            EnrollmentDeadline: "Sunday"
        });

        //Tuesday
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Pilates",
            ClassDay: "Tuesday",
            ClassTime: "1000",
            ClassInstructor: "Ramona",
            MaxCapacity: 20,
            EnrollmentDeadline: "Monday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "HIIT",
            ClassDay: "Tuesday",
            ClassTime: "1200",
            ClassInstructor: "Georgia",
            MaxCapacity: 20,
            EnrollmentDeadline: "Monday"
        });

        //Wednesday
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Zumba",
            ClassDay: "Wednesday",
            ClassTime: "0900",
            ClassInstructor: "Jaqueline",
            MaxCapacity: 20,
            EnrollmentDeadline: "Tuesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Wednesday",
            ClassTime: "1100",
            ClassInstructor: "Aaron",
            MaxCapacity: 20,
            EnrollmentDeadline: "Tuesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Pilates",
            ClassDay: "Wednesday",
            ClassTime: "1430",
            ClassInstructor: "Max",
            MaxCapacity: 20,
            EnrollmentDeadline: "Tuesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Wednesday",
            ClassTime: "1530",
            ClassInstructor: "Jeanie",
            MaxCapacity: 20,
            EnrollmentDeadline: "Tuesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Water Aerobics",
            ClassDay: "Wednesday",
            ClassTime: "1700",
            ClassInstructor: "Jamie",
            MaxCapacity: 20,
            EnrollmentDeadline: "Tuesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Wednesday",
            ClassTime: "1900",
            ClassInstructor: "Carly",
            MaxCapacity: 20,
            EnrollmentDeadline: "Tuesday"
        });

        //Thursday
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Zumba",
            ClassDay: "Thursday",
            ClassTime: "1000",
            ClassInstructor: "Karen",
            MaxCapacity: 20,
            EnrollmentDeadline: "Wednesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "HIIT",
            ClassDay: "Thursday",
            ClassTime: "1100",
            ClassInstructor: "Garrett",
            MaxCapacity: 20,
            EnrollmentDeadline: "Wednesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Thursday",
            ClassTime: "1200",
            ClassInstructor: "Lauren",
            MaxCapacity: 20,
            EnrollmentDeadline: "Wednesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Kickboxing",
            ClassDay: "Thursday",
            ClassTime: "1430",
            ClassInstructor: "Barbara",
            MaxCapacity: 20,
            EnrollmentDeadline: "Wednesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Water Aerobics",
            ClassDay: "Thursday",
            ClassTime: "1000",
            ClassInstructor: "Jackson",
            MaxCapacity: 20,
            EnrollmentDeadline: "Wednesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Pilates",
            ClassDay: "Thursday",
            ClassTime: "1000",
            ClassInstructor: "Brandon",
            MaxCapacity: 20,
            EnrollmentDeadline: "Wednesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Water Dance",
            ClassDay: "Thursday",
            ClassTime: "1000",
            ClassInstructor: "Sky",
            MaxCapacity: 20,
            EnrollmentDeadline: "Wednesday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Thursday",
            ClassTime: "1900",
            ClassInstructor: "Jen",
            MaxCapacity: 20,
            EnrollmentDeadline: "Wednesday"
        });

        //Friday
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Friday",
            ClassTime: "0900",
            ClassInstructor: "Billie",
            MaxCapacity: 20,
            EnrollmentDeadline: "Thursday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Kickboxing",
            ClassDay: "Friday",
            ClassTime: "1100",
            ClassInstructor: "Jeff",
            MaxCapacity: 20,
            EnrollmentDeadline: "Thursday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Water Aerobics",
            ClassDay: "Friday",
            ClassTime: "1200",
            ClassInstructor: "Michael",
            MaxCapacity: 20,
            EnrollmentDeadline: "Thursday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Kickboxing",
            ClassDay: "Friday",
            ClassTime: "1530",
            ClassInstructor: "Randy",
            MaxCapacity: 20,
            EnrollmentDeadline: "Thursday"
        });

        //Saturday
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Pilates",
            ClassDay: "Saturday",
            ClassTime: "0900",
            ClassInstructor: "Nate",
            MaxCapacity: 20,
            EnrollmentDeadline: "Friday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Water Aerobics",
            ClassDay: "Saturday",
            ClassTime: "1000",
            ClassInstructor: "Ben",
            MaxCapacity: 20,
            EnrollmentDeadline: "Friday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Saturday",
            ClassTime: "1430",
            ClassInstructor: "Sarah",
            MaxCapacity: 20,
            EnrollmentDeadline: "Friday"
        });

        //Sunday
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Yoga",
            ClassDay: "Sunday",
            ClassTime: "1000",
            ClassInstructor: "Brenda",
            MaxCapacity: 20,
            EnrollmentDeadline: "Saturday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Zumba",
            ClassDay: "Sunday",
            ClassTime: "1200",
            ClassInstructor: "Jace",
            MaxCapacity: 20,
            EnrollmentDeadline: "Saturday"
        });
        await addDocumentWithAutoIncrement('Classes', {
            ClassID: newCount,
            ClassName: "Pilates",
            ClassDay: "Sunday",
            ClassTime: "1530",
            ClassInstructor: "Parker",
            MaxCapacity: 20,
            EnrollmentDeadline: "Saturday"
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
        
        


