//Schema for the MemberInfo table 
const mongoose = require('mongoose');
const memberInfo_Schema = new mongoose.Schema({
    _id: {
        type: String, 
        required: true, 
        unique: true,
        maxlength: 5
    },
    plan: {
        type: String, 
        required: true,
        maxlength: 10
    },
    contract: {
        type: Boolean, 
        required: true},
    addr1: {
        type: String, 
        required: true,
        maxlength: 50
    },
    addr2: {
        type: String,
        maxlength: 20
    },
    city: {
        type: String, 
        required: true,
        maxlength: 20
    },
    state: {
        type: String, 
        required: true,
        maxlength: 15
    },
    zip: {
        type: String, 
        required: true,
        maxlength: 5
    },
    lastFourofCard: {
        type: String,
        maxlength: 4
        }
});

const MemberInfo = mongoose.model('MemberInfo', memberInfo_Schema);

module.exports = MemberInfo;