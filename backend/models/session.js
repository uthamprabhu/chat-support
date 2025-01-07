const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionToken: { type: String, required: true, unique: true },
    user: { type: String, required: true },
    room: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '24h' }, // Auto-delete after 24 hours
});

module.exports = mongoose.model('Session', sessionSchema);
