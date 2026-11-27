const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    employeeName: {
        type: String,
        required: true
    },
    department: String,
    dateOfJoining: Date,
    salary: Number,
    designation: String,
    mobileNumber: String
});

module.exports = mongoose.model('Employee', employeeSchema);