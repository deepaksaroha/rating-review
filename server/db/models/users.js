import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;