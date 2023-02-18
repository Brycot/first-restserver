const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The Name is required'],
    },
    email: {
        type: String,
        required: [true, 'The Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The Password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('User', UserSchema);
