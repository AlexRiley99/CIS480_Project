//Node.js
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');


const app = express();
const db = new sqlite3.Database('FlexAndFlowDB.db');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes for each page
     //Default Page
    app.get('/', (req, res) =>{
            res.redirect('landing');//Redirect to landing page
            });
    //Landing Page
    app.get('/landing', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'LandingPage', 'LandingPage.html'));
    });
    //About Page
    app.get('/about', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'AboutPage', 'About.html'));
    });
    //Login Page
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'LoginPage', 'Login.html'));
    });

        // Login endpoint
        app.post('/login', (req, res) => {
            const { username, password } = req.body;

            
                db.get(`SELECT * FROM LoginInfo WHERE User = ? AND Pass = ?`, [username, password], (err, row) => {
                    if (err) {
                        return res.status(500).send('Server error');
                    }
                    if (row) {
                        return res.send('Login successful!');
                    } else {
                        return res.status(401).send('Invalid username or password');
                    }
                });
            });
            


    //Sign Up Page
    app.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'SignUpPage', 'SignUp.html'));
    });
    //Plans Page
    app.get('/plans', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'PlansPage', 'Plans.html'));
    });
    //Classes Page
    app.get('/classes', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'ClassesPage', 'Classes.html'));
    });
    //Class Sign Up Page
    app.get('/class_signup', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'ClassSignUp', 'ClassSignUp.html'));
    });
    //AccountInfoPage
    app.get('/accountinfo', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'AccountInfoPage', 'AccountInfo.html'));
    });
    //AccountPage
    app.get('/account', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'AccountPage', 'Account.html'));
    });
    //ChangePlanPage
    app.get('/changeplan', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'ChangePlanPage', 'ChangePlan.html'));
    });
    //ChildProfilesPage
    app.get('/childprofiles', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'ChildProfilesPage', 'ChildProfiles.html'));
    });
    //ExampleProfile
    app.get('/exampleprofile', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'ExampleProfile', 'ExampleProfile.html'));
    });
    //JournalPage
    app.get('/journal', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'JournalPage', 'Journal.html'));
    });
    //ManageChildrenPage
    app.get('/managechildren', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'ManageChildrenPage', 'ManageChildren.html'));
    });
    //ManagePlanPage
    app.get('/manageplan', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'ManagePlanPage', 'ManagePlan.html'));
    });
    //NewChildConsentPage
    app.get('/newchildconsent', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'NewChildConsentPage', 'NewChildConsentAgreement.html'));
    });
    //NewChildDisclosurePage
    app.get('/newchilddisclosure', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'NewChildDisclosurePage', 'NewChildDisclosureAgreement.html'));
    });
    //NewChildPage
    app.get('/newchild', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'NewChildPage', 'NewChild.html'));
    });
    //NewMemberConsentPage
    app.get('/newmemberconsent', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'NewMemberConsentPage', 'NewMemberConsentAgreement.html'));
    });
    //NewMemberDisclosure
    app.get('/newmemberdisclosure', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'NewMemberDisclosurePage', 'NewMemberDisclosureAgreement.html'));
    });



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
