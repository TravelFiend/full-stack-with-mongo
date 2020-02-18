const mongoose = require('mongoose');

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
    }
}, {
    toJSON: {
        virtuals: true,
        transform: function(doc, ret){
            delete ret.id;
        }
    }
});

schema.virtual('notes', {
    localField: '_id',
    foreignField: 'pageId',
    ref: 'Note'
});

module.exports = mongoose.model('Page', schema);
