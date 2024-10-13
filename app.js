//Database
require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

//Node.js
const express = require('express');
const path = require('path');
const app = express();

//Database connection
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

//Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes for each page
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
