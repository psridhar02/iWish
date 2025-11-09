// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // KEEP this for the matchPassword method below

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// --- REMOVED THE UserSchema.pre('save', ...) HOOK --- 
// The password hashing must now be handled in the controller before calling User.save()

// Method to compare password (CRUCIAL for login)
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);