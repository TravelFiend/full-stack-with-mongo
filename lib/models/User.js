const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'Email is taken']
    },
    userName: {
        type: String,
        required: true
    },
    pwHash: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.pwHash;
            delete ret.id;
        }
    }
});

schema.virtual('password')
    .set(function(password){
        this.pwHash = bcrypt.hashSync(password, 14);
    });

// schema.virtual('pages', {
//     localField: '_id',
//     foreignField: 'userId',
//     ref: 'Page'
// });

schema.statics.findByToken = function(token){
    try {
        const tokenPayload = jwt.verify(token, process.env.APP_SECRET);
        return Promise.resolve(this.hydrate({
            _id: tokenPayload._id,
            userName: tokenPayload.userName,
            email: tokenPayload.email,
            __v: tokenPayload.__v
        }));
    } catch(err){
        return Promise.reject(err);
    }
};

const throwIt = () => {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
};

schema.statics.authorize = async function({ email, password }){
    const user = await this.findOne({ email });
    console.log(user);
    console.log(password);
    
    
    if(!user){
        throwIt();
    }
    const validPassword = bcrypt.compareSync(password, user.pwHash);
    console.log(validPassword);
    
    if(!validPassword){
        throwIt();
    }
    return user;
};

schema.methods.authToken = function(){
    return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
        expiresIn: '24h'
    });
};

module.exports = mongoose.model('User', schema);
