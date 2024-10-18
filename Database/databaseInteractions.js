/*************************************************
 * This JavaScript file is for managing db interactions 
 * using Firebase/FireStore
 */
/********Firebase Configuration*********/
// Import functions 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

//Add SDKs for Firebase products:
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCjp08hg0zwmkeXKl0Z1d5jMvj0Njfq2dM",
  authDomain: "cis480-project.firebaseapp.com",
  dbURL: "https://cis480-project.firebaseio.com",
  projectId: "cis480-project",
  storageBucket: "cis480-project.appspot.com",
  messagingSenderId: "513907575321",
  appId: "1:513907575321:web:a4c98b75f760871a7a7888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = getFirestore(app); //Use firestore for db operations

/******Bcrypt for hashing passwords******/
const bcrypt = require('bcrypt');
/*********************************************************************/
//db Functions
    //Using transactions makes it so that if multiple users
    //add something to the db, it won't mess up the counter

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
    
        const newCount = await db.runTransaction(async (transaction) => {
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
    const classRef = doc(db, 'Classes', classID);
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

// Function to add Plans
async function addPlans() {
    try {
        // Create an array of promises using map
        const planPromises = Plans.map(async (plan) => {
            // Call addDocumentWithAutoIncrement for each plan
            return await addDocumentWithAutoIncrement('Plans', plan);
        });

        // Wait for all promises to resolve
        const planIDs = await Promise.all(planPromises);
        console.log(`Plans added with IDs: ${planIDs}`);
    } catch (error) {
        console.error("Error adding Plans:", error);
    }
}
// Call function
addPlans();

// Function to add Members from code
async function addMembers() {
    try {
        const memberPromises = Members.map(async (member) => {
            return await addDocumentWithAutoIncrement('Members', member);
        });
        
        const memberIDs = await Promise.all(memberPromises);
        console.log(`Members added with IDs: ${memberIDs}`);
    } catch (error) {
        console.error("Error adding Members:", error);
    }
}
//Call function
addMembers();

// Function to add Children from code
async function addChildren() {
    try {
        const childPromises = Children.map(async (child) => {
            return await addDocumentWithAutoIncrement('Children', child);
        });

        const childIDs = await Promise.all(childPromises);
        console.log(`Children added with IDs: ${childIDs}`);
    } catch (error) {
        console.error("Error adding Children:", error);
    }
}
//Call function
addChildren(); 

/*********************Sign Up Form****************************/
//Add member from signup form
    //Hash password
async function hashPassword(password) {
    const saltRounds = 10; // The number of rounds for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}


document.getElementById('signupForm').addEventListener('submit', handleSignup);

async function handleSignup(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather data from form fields
    const memberInfo = {
        FirstName: document.getElementById('firstName').value,
        LastName: document.getElementById('lastName').value,
        Phone: document.getElementById('phone').value,
        Email: document.getElementById('email').value,
        JoinDate: new Date(), // Current date
        Address1: document.getElementById('addr1').value,
        Address2: document.getElementById('addr2').value,
        City: document.getElementById('city').value,
        State: document.getElementById('state').value,
        ZipCode: document.getElementById('zip').value,
        PlanID: getPlanID()
    };

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const error = document.getElementById('error').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        error.textContent = "*Passwords do not match";
        return;
    }

    try {
        const hashedPassword = await hashPassword(password); //Hash password

        // Add member info to Members collection
        const memberID = await addDocumentWithAutoIncrement('Members', memberInfo);
        
        // Add login info
        const loginInfo = {
            loginID: newCount, 
            User: username,
            Pass: hashedPassword, //Never save the user's actual password
            MemberID: memberID
        };
        
        await addDocumentWithAutoIncrement('LoginInfo', loginInfo); 

        alert(`Member added! Your Member ID is: ${memberID}. Remember this number, as you will need it to log in.`);
    } catch (error) {
        alert("Error adding member. Please ensure all data is added correctly. If so, please contact admin for assistance.");
    }
}


//Function to get plan ID based on user's selected plan
function getPlanID(){
    const planSelect = document.getElementById('Plans');
    return Array.from(planSelect.options).find(option => option.selected).value;
}

/************************New Child Form**************************/
//Add child from New Child form
const dob = new Date(document.getElementById('dob').value);
const consentDate = new Date(document.getElementById('consentDate').value);
const disclosureDate = new Date(document.getElementById('disclosureDate').value);

async function handleNewChild(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather data from the form fields
    const dob = new Date(document.getElementById('dob').value);
    const consentDate = new Date(document.getElementById('consentDate').value);
    const disclosureDate = new Date(document.getElementById('disclosureDate').value);

    const childData = {
        FirstName: document.getElementById('firstName').value,
        LastName: document.getElementById('lastName').value,
        DateOfBirth: dob,
        Nickname: document.getElementById('nickname').value,
        Allergies: document.getElementById('allergies').value,
        EpiPen: document.getElementById('epipen').value,
        Disabilities: document.getElementById('disabilities').value,
        Accommodations: document.getElementById('accommodations').value,
        ConsentSignature: document.getElementById('consentSignature').value,
        ConsentDate: consentDate,
        DisclosureSignature: document.getElementById('disclosureSignature').value,
        DisclosureDate: disclosureDate
    };

        // Add child data
        const childID = await addDocumentWithAutoIncrement('Children', childData);
        console.log(`Child added with ID: ${childID}`);

        // Gather and add emergency contacts
        const emergencyContacts = [
            {
                FirstName: document.getElementById('c1FirstName').value,
                LastName: document.getElementById('c1LastName').value,
                Phone: document.getElementById('c1Phone').value,
                Relationship: document.getElementById('c1Relationship').value,
                ChildID: childID // Reference to the child's ID
            },
            {
                FirstName: document.getElementById('c2FirstName').value,
                LastName: document.getElementById('c2LastName').value,
                Phone: document.getElementById('c2Phone').value,
                Relationship: document.getElementById('c2Relationship').value,
                ChildID: childID // Reference to the child's ID
            },
            {
                FirstName: document.getElementById('c3FirstName').value,
                LastName: document.getElementById('c3LastName').value,
                Phone: document.getElementById('c3Phone').value,
                Relationship: document.getElementById('c3Relationship').value,
                ChildID: childID // Reference to the child's ID
            }
        ];

        // Loop through each emergency contact and add it to Firestore
        for (const contact of emergencyContacts) {
            if (contact.FirstName || contact.LastName || contact.Phone) { // Check if at least some data is provided
                await addEmergencyContact(contact);
            }
        }

        // Gather and add authorized adults
        const authorizedAdults = [
            {
                FirstName: document.getElementById('aa1FirstName').value,
                LastName: document.getElementById('aa1LastName').value,
                Phone: document.getElementById('aa1Phone').value,
                Relationship: document.getElementById('aa1Relationship').value,
                ChildID: childID // Reference to the child's ID
            },
            {
                FirstName: document.getElementById('aa2FirstName').value,
                LastName: document.getElementById('aa2LastName').value,
                Phone: document.getElementById('aa2Phone').value,
                Relationship: document.getElementById('aa2Relationship').value,
                ChildID: childID // Reference to the child's ID
            },
            {
                FirstName: document.getElementById('aa3FirstName').value,
                LastName: document.getElementById('aa3LastName').value,
                Phone: document.getElementById('aa3Phone').value,
                Relationship: document.getElementById('aa3Relationship').value,
                ChildID: childID // Reference to the child's ID
            }
        ];

        // Loop through each authorized adult and add it to Firestore
        for (const adult of authorizedAdults) {
            if (adult.FirstName || adult.LastName || adult.Phone) { // Check if at least some data is provided
                await addAuthorizedAdult(adult);
            }
        }
}

//Call function to add child to Firestore
try{
    const childID = await addDocumentWithAutoIncrement('Children', childInfo);
    alert("Child added successfully!");
}catch (error){
    alert("Error adding child. Please ensure all data is added correctly. If so, please contact admin for assistance.");
}

//Add Emergency Contact from New Child form
async function addEmergencyContact(contactData) {
    return await addDocumentWithAutoIncrement('EmergencyContacts', contactData);
}

//Add Authorized Adult from New Child form
async function addAuthorizedAdult(adultData) {
    return await addDocumentWithAutoIncrement('AuthorizedAdults', adultData);
}

/**************************Login******************************/
async function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    // Get user input
    const username = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;
    const inputMemberID = document.getElementById('memberid').value;

    try {
        // Fetch the user's document from Firestore
        const memberDoc = await db.collection('Members').doc(username).get();
        
        if (!userDoc.exists) {
            document.getElementById('error').textContent = "*Invalid username. Please try again.";
            return;
        }

        const userData = userDoc.data();
        
        // Verify the member ID
        if (userData.memberID !== inputMemberID) {
            document.getElementById('error').textContent = "*Invalid member ID. Please try again.";
            return;
        }

        // Use Firebase Authentication to sign in with email and password
        const userCredential = await auth.signInWithEmailAndPassword(userData.email, inputPassword);
        
        // Successful login
        window.location.href = "../AccountPage/Account.html";

    } catch (error) {
        document.getElementById('error').textContent = "*Invalid username or password. Please try again.";
    }
}



/******************************************************************/
//Add data to Firestore
(async () => {
    //Create an array of Plans
    const Plans = [
        { PlanName: "Silver Plan", PlanCost: 19.99 },
        { PlanName: "Gold Plan", PlanCost: 29.99 },
        { PlanName: "Platinum Plan", PlanCost: 39.99 },
        { PlanName: "Diamond Plan", PlanCost: 49.99 }
    ];   

        //Members
        //Array of Members
        const Members = [
            {
                FirstName: "Alex",
                LastName: "Riley",
                Phone: "843-714-8829",
                Email: "aleril0593@students.ecpi.edu",
                JoinDate: new Date(),
                Address1: "311 Macgregor Dr",
                Address2: "",
                City: "Summerville",
                State: "South Carolina",
                ZipCode: "29486",
                PlanID: 1
            }
        ];

        //Children
        //Array of Children
        const Children = [
        {
            FirstName: "Marceline",
            LastName: "Riley",
            DateOfBirth: 1/21/2021,
            Nickname: "Marcie",
            EnrollmentDate: new Date(),
            Allergies: "",
            EpiPen: false,
            Disabilities: "",
            Accommodations: "",
            ConsentSignature: "Alex R. Riley",
            ConsentDate: 10/17/2024,
            DisclosureSignature: "Alex R. Riley",
            DisclosureDate: 10/17/2024,
            MemberID: 1
        },
        {
            FirstName: "Jovie",
            LastName: "Riley",
            DateOfBirth: 5/4/2023,
            Nickname: "Jojo",
            EnrollmentDate: new Date(),
            Allergies: "",
            EpiPen: false,
            Disabilities: "",
            Accommodations: "",
            ConsentSignature: "Alex R. Riley",
            ConsentDate: 10/17/2024,
            DisclosureSignature: "Alex R. Riley",
            DisclosureDate: 10/17/2024,
            MemberID: 1
        }
    ];

        //EmergencyContacts
            //Array of Emergency Contacts
        const EmergencyContacts = [
            {
                ContactID: newCount,
                FirstName: "Derek",
                LastName: "Riley",
                Phone: "812-345-4383",
                Relationship: "Father",
                ChildID: 1
            },
            {
                ContactID: newCount,
                FirstName: "Derek",
                LastName: "Riley",
                Phone: "812-345-4383",
                Relationship: "Father",
                ChildID: 2
            }
        ];

        //AuthorizedAdults
            //Array of Authorized Adults
        const AuthorizedAdults = [
            {
                AdultID: newCount,
                FirstName: "Derek",
                LastName: "Riley",
                Phone: "812-345-4383",
                Relationship: "Father",
                ChildID: 1
            },
            {
                AdultID: newCount,
                FirstName: "Derek",
                LastName: "Riley",
                Phone: "812-345-4383",
                Relationship: "Father",
                ChildID: 2
            }
        ];

        //Classes
            //Array of Classes
        const Classes = [
            //Monday
            {
                ClassID: newCount,
                ClassName: "Water Aerobics",
                ClassDay: "Monday",
                ClassTime: "0900",
                ClassInstructor: "Alice",
                MaxCapacity: 20,
                EnrollmentDeadline: "Sunday"
            },
            {
                ClassID: newCount,
                ClassName: "Jazzercise",
                ClassDay: "Monday",
                ClassTime: "1100",
                ClassInstructor: "Janice",
                MaxCapacity: 20,
                EnrollmentDeadline: "Sunday"
            },
            {
                ClassID: newCount,
                ClassName: "Water Aerobics",
                ClassDay: "Monday",
                ClassTime: "1430",
                ClassInstructor: "Jordan",
                MaxCapacity: 20,
                EnrollmentDeadline: "Sunday"
            },
            {
                ClassID: newCount,
                ClassName: "HIIT",
                ClassDay: "Monday",
                ClassTime: "1530",
                ClassInstructor: "Jason",
                MaxCapacity: 20,
                EnrollmentDeadline: "Sunday"
            },
            {
                ClassID: newCount,
                ClassName: "Yoga",
                ClassDay: "Monday",
                ClassTime: "1700",
                ClassInstructor: "Aaron",
                MaxCapacity: 20,
                EnrollmentDeadline: "Sunday"
            },
            {
                ClassID: newCount,
                ClassName: "HIIT",
                ClassDay: "Monday",
                ClassTime: "1900",
                ClassInstructor: "Becca",
                MaxCapacity: 20,
                EnrollmentDeadline: "Sunday"
            },
    
            //Tuesday
            {
                ClassID: newCount,
                ClassName: "Pilates",
                ClassDay: "Tuesday",
                ClassTime: "1000",
                ClassInstructor: "Ramona",
                MaxCapacity: 20,
                EnrollmentDeadline: "Monday"
            },
            {
                ClassID: newCount,
                ClassName: "HIIT",
                ClassDay: "Tuesday",
                ClassTime: "1200",
                ClassInstructor: "Georgia",
                MaxCapacity: 20,
                EnrollmentDeadline: "Monday"
            },
    
            //Wednesday
            {
                ClassID: newCount,
                ClassName: "Zumba",
                ClassDay: "Wednesday",
                ClassTime: "0900",
                ClassInstructor: "Jaqueline",
                MaxCapacity: 20,
                EnrollmentDeadline: "Tuesday"
            },
            {
                ClassID: newCount,
                ClassName: "Yoga",
                ClassDay: "Wednesday",
                ClassTime: "1100",
                ClassInstructor: "Aaron",
                MaxCapacity: 20,
                EnrollmentDeadline: "Tuesday"
            },
            {
                ClassID: newCount,
                ClassName: "Pilates",
                ClassDay: "Wednesday",
                ClassTime: "1430",
                ClassInstructor: "Max",
                MaxCapacity: 20,
                EnrollmentDeadline: "Tuesday"
            },
            {
                ClassID: newCount,
                ClassName: "Yoga",
                ClassDay: "Wednesday",
                ClassTime: "1530",
                ClassInstructor: "Jeanie",
                MaxCapacity: 20,
                EnrollmentDeadline: "Tuesday"
            },
            {
                ClassID: newCount,
                ClassName: "Water Aerobics",
                ClassDay: "Wednesday",
                ClassTime: "1700",
                ClassInstructor: "Jamie",
                MaxCapacity: 20,
                EnrollmentDeadline: "Tuesday"
            },
            {
                ClassID: newCount,
                ClassName: "Yoga",
                ClassDay: "Wednesday",
                ClassTime: "1900",
                ClassInstructor: "Carly",
                MaxCapacity: 20,
                EnrollmentDeadline: "Tuesday"
            },
    
            //Thursday
            {
                ClassID: newCount,
                ClassName: "Zumba",
                ClassDay: "Thursday",
                ClassTime: "1000",
                ClassInstructor: "Karen",
                MaxCapacity: 20,
                EnrollmentDeadline: "Wednesday"
            },
            {
                ClassID: newCount,
                ClassName: "HIIT",
                ClassDay: "Thursday",
                ClassTime: "1100",
                ClassInstructor: "Garrett",
                MaxCapacity: 20,
                EnrollmentDeadline: "Wednesday"
            },
            {
                ClassID: newCount,
                ClassName: "Yoga",
                ClassDay: "Thursday",
                ClassTime: "1200",
                ClassInstructor: "Lauren",
                MaxCapacity: 20,
                EnrollmentDeadline: "Wednesday"
            },
            {
                ClassID: newCount,
                ClassName: "Kickboxing",
                ClassDay: "Thursday",
                ClassTime: "1430",
                ClassInstructor: "Barbara",
                MaxCapacity: 20,
                EnrollmentDeadline: "Wednesday"
            },
            {
                ClassID: newCount,
                ClassName: "Water Aerobics",
                ClassDay: "Thursday",
                ClassTime: "1000",
                ClassInstructor: "Jackson",
                MaxCapacity: 20,
                EnrollmentDeadline: "Wednesday"
            },
            {
                ClassID: newCount,
                ClassName: "Pilates",
                ClassDay: "Thursday",
                ClassTime: "1000",
                ClassInstructor: "Brandon",
                MaxCapacity: 20,
                EnrollmentDeadline: "Wednesday"
            },
            {
                ClassID: newCount,
                ClassName: "Water Dance",
                ClassDay: "Thursday",
                ClassTime: "1000",
                ClassInstructor: "Sky",
                MaxCapacity: 20,
                EnrollmentDeadline: "Wednesday"
            },
            {
                ClassID: newCount,
                ClassName: "Yoga",
                ClassDay: "Thursday",
                ClassTime: "1900",
                ClassInstructor: "Jen",
                MaxCapacity: 20,
                EnrollmentDeadline: "Wednesday"
            },
    
            //Friday
            {
                ClassID: newCount,
                ClassName: "Yoga",
                ClassDay: "Friday",
                ClassTime: "0900",
                ClassInstructor: "Billie",
                MaxCapacity: 20,
                EnrollmentDeadline: "Thursday"
            },
            {
                ClassID: newCount,
                ClassName: "Kickboxing",
                ClassDay: "Friday",
                ClassTime: "1100",
                ClassInstructor: "Jeff",
                MaxCapacity: 20,
                EnrollmentDeadline: "Thursday"
            },
            {
                ClassID: newCount,
                ClassName: "Water Aerobics",
                ClassDay: "Friday",
                ClassTime: "1200",
                ClassInstructor: "Michael",
                MaxCapacity: 20,
                EnrollmentDeadline: "Thursday"
            },
            {
                ClassID: newCount,
                ClassName: "Kickboxing",
                ClassDay: "Friday",
                ClassTime: "1530",
                ClassInstructor: "Randy",
                MaxCapacity: 20,
                EnrollmentDeadline: "Thursday"
            },
    
            //Saturday
            {
                ClassID: newCount,
                ClassName: "Pilates",
                ClassDay: "Saturday",
                ClassTime: "0900",
                ClassInstructor: "Nate",
                MaxCapacity: 20,
                EnrollmentDeadline: "Friday"
            },
            {
                ClassID: newCount,
                ClassName: "Water Aerobics",
                ClassDay: "Saturday",
                ClassTime: "1000",
                ClassInstructor: "Ben",
                MaxCapacity: 20,
                EnrollmentDeadline: "Friday"
            },
            {
                ClassID: newCount,
                ClassName: "Yoga",
                ClassDay: "Saturday",
                ClassTime: "1430",
                ClassInstructor: "Sarah",
                MaxCapacity: 20,
                EnrollmentDeadline: "Friday"
            },
    
            //Sunday
            {
                ClassID: newCount,
                ClassName: "Yoga",
                ClassDay: "Sunday",
                ClassTime: "1000",
                ClassInstructor: "Brenda",
                MaxCapacity: 20,
                EnrollmentDeadline: "Saturday"
            },
            {
                ClassID: newCount,
                ClassName: "Zumba",
                ClassDay: "Sunday",
                ClassTime: "1200",
                ClassInstructor: "Jace",
                MaxCapacity: 20,
                EnrollmentDeadline: "Saturday"
            },
            {
                ClassID: newCount,
                ClassName: "Pilates",
                ClassDay: "Sunday",
                ClassTime: "1530",
                ClassInstructor: "Parker",
                MaxCapacity: 20,
                EnrollmentDeadline: "Saturday"
            }
        ];
         
        
        
        
        

        //ClassEnrollments
        //Array of enrollents
        const ClassEnrollments = [
            {
                EnrollmentID: newCount,
                EnrollmentDay: currentDay,
                ClassID: 1, 
                MemberID: 1
            }
        ];
        
        
        //JournalEntries
            //Array of entries
        const JournalEntries = [
            {
                EntryID: newCount,
                EntryDate: new Date(),
                Entry: "Treadmill 20 minutes, machines 30 minutes, spin bike 20 minutes",
                MemberID: 1
            }
        ];
        
        
        //LoginInfo
            //Array of login info
        const LoginInfo = [
            {
                loginID: newCount,
                User: "AlexR99",
                Pass: "Password1*",
                MemberID: 1
            }
        ];
})();
        

