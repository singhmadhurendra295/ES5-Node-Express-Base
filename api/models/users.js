import mongoose from 'mongoose';
var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: String,
    password: String
});

module.exports = mongoose.model('users', userSchema);