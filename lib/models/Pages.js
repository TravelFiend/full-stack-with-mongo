const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    pageDate: {
        type: Date,
        required: true
    }
});

schema.virtual('notes', {
    ref: 'Notes',
    localField: '_id',
    foreignField: 'pagesId'
});

module.exports = mongoose.model('Pages', schema);
