const express = require('express')
const Review = require('../db/models/reviews')

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

    Review.updateOne( {bookId: bookId, userId: userId}, { rating: newRating, review: newReview, date: Date.now() }, {upsert: true} )
    .then(()=>{
        res.status(201).send({message: "Review Added"});
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