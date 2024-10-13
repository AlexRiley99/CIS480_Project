const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('FlexAndFlowDB.db');

db.serialize(() => { 
    // Create Tables
    // Plans
    db.run(`CREATE TABLE IF NOT EXISTS Plans (
        PlanID INTEGER PRIMARY KEY AUTOINCREMENT,
        PlanName TEXT NOT NULL,
        PlanCost REAL NOT NULL
    )`);

    // Members
    db.run(`CREATE TABLE IF NOT EXISTS Members (
        MemberID INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT NOT NULL,
        LastName TEXT NOT NULL,
        Phone TEXT NOT NULL,          
        Email TEXT NOT NULL,
        JoinDate DATE NOT NULL,
        Address1 TEXT NOT NULL,
        Address2 TEXT,
        City TEXT NOT NULL,
        State TEXT NOT NULL,
        ZipCode TEXT NOT NULL,        
        PlanID INTEGER,
        FOREIGN KEY (PlanID) REFERENCES Plans(PlanID)  
    )`);

    // Children
    db.run(`CREATE TABLE IF NOT EXISTS Children (
        ChildID INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT NOT NULL,
        LastName TEXT NOT NULL,
        EnrollmentDate DATE NOT NULL,
        Allergies TEXT,
        EpiPen BOOLEAN,
        Disabilities TEXT,
        Accommodations TEXT,
        MemberID INTEGER NOT NULL,
        FOREIGN KEY (MemberID) REFERENCES Members(MemberID)  
    )`);

    // EmergencyContacts
    db.run(`CREATE TABLE IF NOT EXISTS EmergencyContacts (
        ContactID INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT NOT NULL,
        LastName TEXT NOT NULL,
        Phone TEXT NOT NULL,
        Relationship TEXT NOT NULL,   
        ChildID INTEGER NOT NULL,
        FOREIGN KEY (ChildID) REFERENCES Children(ChildID)  
    )`);

    // AuthorizedAdults
    db.run(`CREATE TABLE IF NOT EXISTS AuthorizedAdults (
        AdultID INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT NOT NULL,
        LastName TEXT NOT NULL,
        Phone TEXT NOT NULL,
        Relationship TEXT NOT NULL,   
        ChildID INTEGER NOT NULL,
        FOREIGN KEY (ChildID) REFERENCES Children(ChildID)  
    )`);

    // Classes
    db.run(`CREATE TABLE IF NOT EXISTS Classes (
        ClassID INTEGER PRIMARY KEY AUTOINCREMENT,
        ClassName TEXT NOT NULL,
        ClassSchedule DATETIME NOT NULL,
        ClassInstructor TEXT NOT NULL
    )`);

    // ClassEnrollments
    db.run(`CREATE TABLE IF NOT EXISTS ClassEnrollments (
        EnrollmentID INTEGER PRIMARY KEY AUTOINCREMENT,
        ClassID INTEGER NOT NULL,
        MemberID INTEGER NOT NULL,
        FOREIGN KEY (ClassID) REFERENCES Classes(ClassID),  
        FOREIGN KEY (MemberID) REFERENCES Members(MemberID)  
    )`);

    // Journal
    db.run(`CREATE TABLE IF NOT EXISTS Journal (
        EntryID INTEGER PRIMARY KEY AUTOINCREMENT,
        EntryDate DATE NOT NULL,
        Entry TEXT NOT NULL,
        MemberID INTEGER NOT NULL,
        FOREIGN KEY (MemberID) REFERENCES Members(MemberID)  
    )`);

    // LoginInfo
    db.run(`CREATE TABLE IF NOT EXISTS LoginInfo (
        LoginID INTEGER PRIMARY KEY AUTOINCREMENT,
        Pass TEXT NOT NULL,
        User TEXT NOT NULL,
        MemberID INTEGER NOT NULL,
        FOREIGN KEY (MemberID) REFERENCES Members(MemberID)  
    )`);
});
// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing the database:', err.message);
    } else {
        console.log('Data entered successfully.');
    }
});