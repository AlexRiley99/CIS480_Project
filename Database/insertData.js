const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('FlexAndFlowDB.db');

db.serialize(() => {
    


//Insert data into tables
    //Plans
    db.run(`INSERT INTO Plans (PlanName, PlanCost) VALUES (?, ?)`, ['Silver Plan', 19.99]);
    db.run(`INSERT INTO Plans (PlanName, PlanCost) VALUES (?, ?)`, ['Gold Plan', 29.99]);
    db.run(`INSERT INTO Plans (PlanName, PlanCost) VALUES (?, ?)`, ['Platinum Plan', 39.99]);
    db.run(`INSERT INTO Plans (PlanName, PlanCost) VALUES (?, ?)`, ['Diamond Plan', 49.99]);
    
    //Members
    db.run(`INSERT INTO Members (FirstName, LastName, Phone, Email, JoinDate, Address1, City, State, ZipCode, PlanID) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        ['Alex', 'Riley', '8437148829', 'aleril0593@students.ecpi.edu', '2024-10-13', '311 Macgregor Dr', 'Summerville', 'South Carolina', '29486', 4]);

    //Children
    db.run(`INSERT INTO Children (FirstName, LastName, EnrollmentDate, MemberID) 
        VALUES (?, ?, ?, ?)`, 
        ['Marceline', 'Riley', '2024-10-14', 1]);
    db.run(`INSERT INTO Children (FirstName, LastName, EnrollmentDate, MemberID) 
        VALUES (?, ?, ?, ?)`, 
        ['Jovie', 'Riley', '2024-10-14', 1]);
        
    //EmergencyContacts
    db.run(`INSERT INTO EmergencyContacts (FirstName, LastName, Phone, Relationship, ChildID) 
        VALUES (?, ?, ?, ?, ?)`, 
        ['Derek', 'Riley', '8123454383', 'Father', 1]);
    db.run(`INSERT INTO EmergencyContacts (FirstName, LastName, Phone, Relationship, ChildID) 
        VALUES (?, ?, ?, ?, ?)`, 
        ['Derek', 'Riley', '8123454383', 'Father', 2]);

    //AuthorizedAdults
    db.run(`INSERT INTO AuthorizedAdults (FirstName, LastName, Phone, Relationship, ChildID) 
        VALUES (?, ?, ?, ?, ?)`, 
        ['Derek', 'Riley', '8123454383', 'Father', 1]);
    db.run(`INSERT INTO AuthorizedAdults (FirstName, LastName, Phone, Relationship, ChildID) 
        VALUES (?, ?, ?, ?, ?)`, 
        ['Derek', 'Riley', '8123454383', 'Father', 2]);

    //Classes
        //Monday
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
            VALUES (?, ?, ?)`, 
            ['Water Aerobics', '2024-10-14 09:00:00', 'Emily']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
            VALUES (?, ?, ?)`, 
            ['Jazzercise', '2024-10-14 11:00:00', 'Susan']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
            VALUES (?, ?, ?)`, 
            ['Water Aerobics', '2024-10-14 14:30:00', 'Jeff']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
            VALUES (?, ?, ?)`, 
            ['HIIT', '2024-10-14 15:30:00', 'Georgia']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
            VALUES (?, ?, ?)`, 
            ['Yoga', '2024-10-14 17:00:00', 'Aaron']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
            VALUES (?, ?, ?)`, 
            ['HIIT', '2024-10-14 14:30:00', 'Max']);

        //Tuesday
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Pilates', '2024-10-15 10:00:00', 'Rebecca']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['HIIT', '2024-10-15 12:00:00', 'Georgia']);

        //Wednesday
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Zumba', '2024-10-16 09:00:00', 'Amelia']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Yoga', '2024-10-16 11:00:00', 'Aaron']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Pilates', '2024-10-16 14:30:00', 'Rebecca']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Yoga', '2024-10-16 15:30:00', 'Robin']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Water Aerobics', '2024-10-16 17:00:00', 'Jeff']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Yoga', '2024-10-16 19:00:00', 'Marty']);

        //Thursday
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Zumba', '2024-10-17 10:00:00', 'Jack']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['HIIT', '2024-10-17 11:00:00', 'Georgia']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Yoga', '2024-10-17 12:00:00', 'Aaron']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Kickboxing', '2024-10-17 14:30:00', 'Ruby']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Water Dance', '2024-10-17 15:30:00', 'Martha']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Pilates', '2024-10-17 17:00:00', 'Rebecca']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Water Dance', '2024-10-17 19:00:00', 'Marvin']);

        //Friday
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Yoga', '2024-10-18 09:00:00', 'Marty']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Kickboxing', '2024-10-18 11:00:00', 'Jason']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Water Aerobics', '2024-10-18 12:00:00', 'Emily']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Kickboxing', '2024-10-18 15:30:00', 'Ruby']);

        //Saturday
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Pilates', '2024-10-19 09:00:00', 'Rebecca']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Water Aerobics', '2024-10-19 10:00:00', 'Emily']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Yoga', '2024-10-19 14:30:00', 'Jean']);

        //Sunday
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Yoga', '2024-10-20 10:00:00', 'Brenda']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Zumba', '2024-10-20 12:00:00', 'Ramon']);
        db.run(`INSERT INTO Classes (ClassName, ClassSchedule, ClassInstructor) 
        VALUES (?, ?, ?)`, 
        ['Pilates', '2024-10-20 15:30:00', 'Barb']);


    //ClassEnrollments
    db.run(`INSERT INTO ClassEnrollments (ClassID, MemberID) 
        VALUES (?, ?)`, 
        [1, 1]);

    //Journal
    db.run(`INSERT INTO Journal (EntryDate, Entry, MemberID) 
        VALUES (?, ?, ?)`, 
        ['2024-10-13', 'Spent 20 minutes on the treadmill. Then, used the arm machines, leg machines, and ab machines. Then, used the spin bike for an additional 20 minutes.', 1]);

    //LoginInfo
    db.run(`INSERT INTO LoginInfo (Pass, User, MemberID) 
        VALUES (?, ?, ?)`, 
        ['Password1*', 'ARiley99', 1]);
});

db.all(`SELECT * FROM Members`, [], (err, rows) =>{
    if(err){
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing the database:', err.message);
    } else {
        console.log('Data inserted successfully.');
    }
});
