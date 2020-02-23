const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    subtitle: String,
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

module.exports = mongoose.model('Note', schema);
