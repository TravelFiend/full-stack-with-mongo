const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
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

const schema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    pageDate: {
        type: Date,
        required: true
    },
    notes: [notesSchema]
});

module.exports = mongoose.model('Page', schema);