const mongoose = require('mongoose');
const Notes = require('./Notes');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: [ String ],
    pageDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Pages', schema);
