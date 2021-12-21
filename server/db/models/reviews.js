const mongoose = require( 'mongoose')
const { Schema } = require( 'mongoose')

const reviewSchema = new Schema({
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
    date: {
        type: Date,
        default: Date.now
    },
    upvoteCount:{
        type: Number,
        default: 0
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;