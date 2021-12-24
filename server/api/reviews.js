const express = require('express')
const Review = require('../db/models/reviews')
const Book = require('../db/models/books')

const router = express.Router();

//add or update a review
router.post('/', (req, res, next)=>{
    if(!req.session.userId){
        res.status(401).send({error: 'User not authenticated'});
        return;
    }

    if(!req.body){
        res.status(400).send({error: 'Incomplete Request'});
        return;
    }

    const userId = req.session.userId;

    let { newRating, newReview, bookId } = req.body;

    if(newReview === undefined){
        newReview = ''
    }
    
    if(!newRating || !bookId || !userId){
        res.status(400).send({error: 'Information incomplete'});
        return;
    }

    Promise.all([Review.findOneAndUpdate({ bookId: bookId, userId: userId}, { rating: newRating, review: newReview }, { upsert: true }), Book.findOne({ bookId: bookId })])
    .then(results=>{
        console.log(results);
        const oldReview = results[0];
        const book = results[1];
        if(oldReview === null){
            const newAvgRating = (book.avgRating*book.ratingCount + newRating)/(book.ratingCount + 1);
            const newRatingCount = book.ratingCount+1;
            const newReviewCount = book.reviewCount+( newReview ===''? 0 : 1 );
            return Book.updateOne({ bookId: bookId }, { avgRating: newAvgRating, ratingCount: newRatingCount, reviewCount: newReviewCount })
        }else if(oldReview.rating !== newRating){
            const newAvgRating = (book.avgRating*book.ratingCount - oldReview.rating + newRating)/book.ratingCount;
            return Book.updateOne({ bookId: bookId }, { avgRating: newAvgRating })
        }
    })
    .then((result)=>{
        res.status(200).send({message: 'Review Added'})
    })
    .catch(error=>{
        res.status(501).send({error:'Internal server error!'});
    })

})

//get reviews for a book
router.get('/:bookId', (req, res, next)=>{

    Review.find( {bookId: req.params.bookId} )
    .then(reviewList=>{
        res.status(200).send({reviewList: reviewList});
    })
    .catch(error=>{
        res.status(501).send({error:'Internal server error!'});
    })
})

module.exports = router;