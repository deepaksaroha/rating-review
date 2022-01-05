const mongoose = require( 'mongoose')
const { Schema } = require( 'mongoose')


const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        default: "/defaultbookthumbnail.png"
    },
    bookId:{
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true,
    },
    edition:{
        type: Number,
        default: 1,
    },
    description:{
        type: String,
        maxlength: 350
    },
    published:{
        type: Date,
    },
    isbn:{
        type: String,
        required: true
    },
    languages:{
        type: [String]
    },
    avgRating:{
        type: Number,
        default: 0,
        required: true
    },
    reviewCount:{
        type: Number,
        default: 0,
        required: true
    },
    ratingCount:{
        type: Number,
        default: 0,
        required: true
    },
    availability:{
        type: {
            amazon: {
                type: Boolean,
                default: false
            },
            flipkart: {
                type: Boolean,
                default: false
            },
            kindle: {
                type: Boolean,
                default: false
            },
        }
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;