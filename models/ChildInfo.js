const mongoose = require('mongoose');
const ChildInfo_Schema = new mongoose.Schema({
    _id: {
        type: String, 
        required: true, 
        unique: true,
        maxlength: 5
    },
    childName: {
        type: String, 
        required: true,
        maxlength: 50
    },
    parentMemberID: {
        type: String,
        required: true,
        maxlength: 5
    },
    allergies: {
        type: String,
        maxlength: 50
    },
    epipen: {
        type: Boolean
    },
    disabilities: {
        type: String,
        maxlength: 50
    },
    accommodations: {
        type: String,
        maxlength: 50
    },
    emergencyContacts: {
        type: String,
        maxlength: 1000
    },
    authorizedAdults: {
        type: String,
        maxlength: 1000
    }
});

const ChildInfo = mongoose.model('ChildrenInfo', ChildInfo_Schema);

module.exports = ChildInfo;