const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    subtitle: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    noteDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Notes', schema);
