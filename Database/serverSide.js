/****************SERVER SIDE CODE*******************/
const express = require('express');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://cis480-project.firebaseio.com'
});

const db = admin.firestore();

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to add a new member
app.post('/addMember', async (req, res) => {
    const { PlanID, FirstName, LastName, Email, Phone } = req.body;

    if (!PlanID || !FirstName || !LastName || !Email || !Phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newMemberRef = await db.collection('Members').add({
            PlanID,
            FirstName,
            LastName,
            Email,
            Phone,
            JoinDate: new Date(),
            Addr1, 
            Addr2,
            City,
            State,
            ZipCode,
            CardNumber
        });
        res.status(201).json({ id: newMemberRef.id });
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Failed to add member' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

