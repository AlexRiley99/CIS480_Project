//Schema for the MemberChildren table 
const mongoose = require('mongoose');
const memberChildren_Schema = new mongoose.Schema({
    _id: {
        type: String, 
        required: true, 
        unique: true,
        maxlength: 5
    },
    memberName: {
        type: String, 
        required: true,
        maxlength: 50
    },
    numOfChildren: {
        type: Number,
        required: true},
    namesOfChildren: {
        type: String,
        required: true,
        maxlength: 100
    },
    childIDs:{
        type: String,
        required: true,
        maxlength: 100
    }
});

const MemberChildren = mongoose.model('MemberChildren', memberChildren_Schema);

module.exports = MemberChildren;