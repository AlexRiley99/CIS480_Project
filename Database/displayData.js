const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('FlexAndFlowDB.db');

db.serialize(() => {
    db.all(`SELECT * FROM Members`, [], (err, rows) =>{
        if(err){
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });

    db.all(`SELECT * FROM Plans`, [], (err, rows) =>{
        if(err){
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });

    db.all(`SELECT * FROM Children`, [], (err, rows) =>{
        if(err){
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });

    db.all(`SELECT * FROM EmergencyContacts`, [], (err, rows) =>{
        if(err){
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });

    db.all(`SELECT * FROM AuthorizedAdults`, [], (err, rows) =>{
        if(err){
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });

    db.all(`SELECT * FROM LoginInfo`, [], (err, rows) =>{
        if(err){
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });

    db.all(`SELECT * FROM Classes`, [], (err, rows) =>{
        if(err){
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });

    db.all(`SELECT * FROM ClassEnrollments`, [], (err, rows) =>{
        if(err){
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });
});