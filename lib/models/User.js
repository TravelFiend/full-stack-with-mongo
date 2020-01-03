const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Pages = require('./Pages');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'Email is taken']
    },
    username: String,
    pwHash: {
        type: String,
        required: true
    },
    pages: [{ Pages }]
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.pwHash;
        }
    }
});

schema.virtual('password')
    .set(function(password){
        this.pwHash = bcrypt.hashSync(password, 14);
    });

schema.statics.findByToken = function(token){
    try {
        const tokenPayload = jwt.verify(token, process.env.APP_SECRET);
        return Promise.resolve(this.hydrate({
            _id: tokenPayload._id,
            email: tokenPayload.email,
            __v: tokenPayload.__v
        }));
    } catch(err){
        return Promise.reject(err);
    }
};

schema.statics.authorize = async function({ email, password }){
    const user = await this.findOne({ email });
    if(!user){
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }
    const validPassword = await bcrypt.compare(password, user.pwHash);
    if(!validPassword){
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }
    return user;
};

schema.methods.authToken = function(){
    return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
        expiresIn: '24h'
    });
};

module.exports = mongoose.model('User', schema);
