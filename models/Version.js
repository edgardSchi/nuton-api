const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    versionNumber: {
        type: String,
        unique: true,
        required: true
    },
    added: {
        type: [String]
    },
    fixed: {
        type: [String]
    },
    date: {
        type: String,
        required: true
    },
    path: {
        type: String,
        unique: true,
        required: true
    }
});

const Version = mongoose.model('Version', versionSchema);

module.exports = Version;