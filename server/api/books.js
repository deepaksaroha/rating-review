const express = require( 'express')
const Book = require( '../db/models/books.js')
const Review = require('../db/models/reviews')

const router = express.Router();

//all books information
router.get('/', (req, res, next)=>{
    Book.find()
    .then(books=>{
        let bookList = books;
        if(req.sessions.userId !== undefined){
            const userId = req.session.userId;
            bookList.forEach((book, index)=>{
                Review.findOne( {bookId: book.bookId, userId: userId}, {_id:0, rating: 1, review: 1} )
                .then(review=>{
                    bookList[index].userReview = review;
                })
            })
        }
        res.status(200).send({bookList: books});
    })
    .catch(error=>{
        res.status(501).send({error: 'Internal Server Error'});
    })
})

//single book information
router.get('/:bookId', (req, res, next)=>{
    if(!req.params.bookId){
        res.status(400).send({error: 'Invalid Request'});
        return;
    }

    const bookId = req.params.bookId;
    Book.findOne( {bookId: bookId} )
    .then(book=>{
        if(!book){
            res.status(400).send({error: 'Invalid bookId'});
            return;
        }
        const bookData = book;
        if(req.session.userId !== undefined){
            const userId = req.session.userId;
            Review.findOne( {bookId: bookData.bookId, userId: userId}, {_id:0, rating: 1, review: 1} )
            .then(review=>{
                bookData.userReview = review;
            })
        }
        res.status(200).send({bookData: bookData});
    })
    .catch(error=>{
        res.status(501).send({error: 'Internal Server Error!'});
        return;
    })
})

//change single book operation
// router.patch('/:bookId', (req, res, next)=>{
//     if(!req.body){
//         res.status(400).send({error: 'Invalid reqest'});
//     }
// })

module.exports = router;