import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const reviewSchema = new Schema({
    reviewid:{
        type: String,
        required: true
    },
    bookid:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review:{
        type: String,
    },
    date: Date.now,
    upvoteCount:{
        type: Number,
        default: 0
    }
});

const review = mongoose.model('review', reviewSchema);

module.exports = review;