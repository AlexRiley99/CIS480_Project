//Schema for the Children table 
const mongoose = require('mongoose');
const Children_Schema = new mongoose.Schema({
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
        maxlength: 5},
});

const Children = mongoose.model('Children', Children_Schema);

module.exports = Children;