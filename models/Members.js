//Schema for the Members table 
const mongoose = require('mongoose');
const members_Schema = new mongoose.Schema({
    _id: {
        type: String, 
        required: true, 
        unique: true,
        maxlength: 5
    },
    firstName: {
        type: String, 
        required: true,
        maxlength: 20
    },
    lastName: {
        type: String, 
        required: true,
        maxlength: 30
    },
    joinDate: {
        type: Date, 
        required: true
    },
    plan: {
        type: String, 
        required: true,
        maxlength: 10
    },
    contract: {
        type: Boolean, 
        required: true
    }
});

const Member = mongoose.model('Members', members_Schema);

module.exports = Member;