const express = require( 'express')
const Book = require( '../db/models/books.js')
const Review = require('../db/models/reviews')

const router = express.Router();

//all books information
router.get('/', (req, res, next)=>{
    Book.find()
    .then(async books=>{
        let bookList = [];
        books.forEach(book=>{
            bookList.push(Object.assign({}, book.toJSON()));
        })
        // let reviewArr = [];
        if(req.session.userId !== undefined){
            const userId = req.session.userId;
            for(const i in bookList){
                await Review.findOne( {bookId: bookList[i].bookId, userId: userId}, {rating: 1, review: 1} )
                .then(review=>{
                    if(review!=null){
                        bookList[i].userReview = review;
                    }
                })
                .catch(()=>{})
            }


        }
        res.status(200).send({bookList: bookList});
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
    Book.findOne({ bookId: bookId })
    .then(async book=>{
        if(book === null){
            res.status(400).send({error: 'Invalid bookId'});
            return;
        }
        const bookData = Object.assign({}, book.toJSON());
        if(req.session.userId !== undefined){
            const userId = req.session.userId;
            await Review.findOne( {bookId: bookData.bookId, userId: userId}, {rating: 1, review: 1} )
            .then(review=>{
                if(review!==null){
                    bookData.userReview = review;
                }
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