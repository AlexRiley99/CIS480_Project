const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('FlexAndFlowDB.db');

db.serialize(() => {
    // Execute the DELETE command
    db.run(`DELETE FROM Journal WHERE JournalID > ?`, 
        [1], 
        function(err) {
        if (err) {
            return console.error('Error deleting data:', err.message);
        }
        console.log(`Rows deleted: ${this.changes}`);
    });
    
    
    
    db.all(`SELECT * FROM Journal`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Remaining:', rows);
});

// Close the database connection
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        } else {
            console.log('Database closed successfully.');
        }
    });
});
