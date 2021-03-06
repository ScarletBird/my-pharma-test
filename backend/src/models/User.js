const mongoose = require('mongoose');
const uuid = require('node-uuid');

const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR =  10;

const UserSchema = new mongoose.Schema({
    _id: {type: String, default: uuid.v4 },
    name: String,
    email: {
        type: String,
        validate: [ isEmail, 'invalid Email' ],
        required: true,
        index: { unique: true }
    },
    password: { type: String, required: true},
});

UserSchema.pre("save", function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema, 'User')