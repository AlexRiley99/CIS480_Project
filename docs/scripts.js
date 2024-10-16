/*Firebase Configuration*/
// Import functions 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

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

//Add data to Firestore
async function addData(){
    try{
        //Plans
        await db.collection('Plans').add({
            PlanName: "Silver Plan",
            PlanCost: 19.99
        })
        await db.collection('Plans').add({
            PlanName: "Gold Plan",
            PlanCost: 29.99
        })
        await db.collection('Plans').add({
            PlanName: "Platinum Plan",
            PlanCost: 39.99
        })
        await db.collection('Plans').add({
            PlanName: "Diamond Plan",
            PlanCost: 49.99
        })
        //Member
        await db.collection('Members').add({
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
        })
        //Children
        await db.collection('Children').add({
            FirstName: "Marceline",
            LastName: "Riley",
            EnrollmentDate: new Date(),
            Allergies: "None",
            EpiPen: false,
            Disabilities: "None",
            Accommodations: "None",
            MemberID: 1
        })
        await db.collection('Children').add({
            FirstName: "Jovie",
            LastName: "Riley",
            EnrollmentDate: new Date(),
            Allergies: "None",
            EpiPen: false,
            Disabilities: "None",
            Accommodations: "None",
            MemberID: 1
        })
        //EmergencyContacts
        await db.collection('EmergencyContacts').add({
            FirstName: "Derek",
            LastName: "Riley",
            Phone: "812-345-4383",
            Relationship: "Father",
            ChildID: "1"
        })
        await db.collection('EmergencyContacts').add({
            FirstName: "Derek",
            LastName: "Riley",
            Phone: "812-345-4383",
            Relationship: "Father",
            ChildID: "2"
        })
        //AuthorizedAdult
        await db.collection('AuthorizedAdults').add({
            FirstName: "Derek",
            LastName: "Riley",
            Phone: "812-345-4383",
            Relationship: "Father",
            ChildID: "1"
        })
        await db.collection('AuthorizedAdults').add({
            FirstName: "Derek",
            LastName: "Riley",
            Phone: "812-345-4383",
            Relationship: "Father",
            ChildID: "2"
        })
        //Class
        await db.collection('Classes').add({
            ClassName: "Yoga",
            ClassSchedule: new Date(),
            ClassInstructor: "Alice Johnson"
          });
        //ClassEnrollment
        await db.collection('ClassEnrollments').add({
            ClassID: 1, 
            MemberID: 1 
          });
        //JournalEntry
        await db.collection('Journal').add({
            EntryDate: new Date(),
            Entry: "Treadmill 20 minutes, machines 30 minutes, spin bike 20 minutes",
            MemberID: 1
          });
        //LoginInfo
        await db.collection('LoginInfo').add({
            User: "AlexR99",
            Pass: "Password1*",
            MemberID: 1 
          });

    }
}


/*Search Bar Functionality*/
function handleSearch(){
    let searchQuery = document.getElementById('searchQuery').value.toLowerCase(); //get input value
    
    //redirect based on keywords
    if(searchQuery.includes("class") || searchQuery.includes("boxing") ||
        searchQuery.includes("yoga") || searchQuery.includes("pilates") ||
        searchQuery.includes("hiit") || searchQuery.includes("water") || 
        searchQuery.includes("dance") || searchQuery.includes("aerobics") ||
        searchQuery.includes("zumba") || searchQuery.includes("jazzercise")
    ){
        window.location.href = "/classes"; //redirect to classes
    }
    else if(searchQuery.includes("hours") || searchQuery.includes("childcare") ||
        searchQuery.includes("operation") || searchQuery.includes("contact") 
        ){
        window.location.href = "/landing"; //redirect to landing page
    }
    else if(searchQuery.includes("log") || searchQuery.includes("account") ||
    searchQuery.includes("create")
        ){
        window.location.href = "/login"; //redirect to login page
    }
    else{
        let noResult = document.getElementById('noResult');
        noResult.textContent = "No results found"
    }

}