const express = require( 'express')
const review = require( '../db/models/reviews')
const uuid = require( 'uuid')


const router = express.Router();


//add a review
router.post('/', (req, res, next)=>{
    if(!req.session.userId){
        res.status(401).send({error: 'User not authenticated'});
        return;
    }

    if(!req.body){
        res.status(400).send({error: 'Incomplete Request'});
        return;
    }

    const { rating, review, bookId, userId, userName } = req.body;

    if(!rating || !bookId || !userId){
        res.status(400).send({error: 'Information incomplete'});
        return;
    }

    const reviewId = uuid.v4;

    let reviewData = new review({reviewId, rating, bookId, userId, userName});
    if(review){
        reviewData = new review({reviewId, rating, review, bookId, userId, userName});
    }

    reviewData.save()
    .then(()=>{
        res.status(201).send({Id: reviewId});
    })
    .catch(error=>{
        res.status(501).send({error:'Internal server error!'});
    })

})


//get reviews for a book
router.get('/:bookId', (req, res, next)=>{

    review.find({bookId: req.params.bookId})
    .then(reviewList=>{
        res.status(200).send({reviewList: reviewList});
    })
    .catch(error=>{
        res.status(501).send({error:'Internal server error!'});
    })
})

//get reviews/ratings by a user for a book
router.get('/:bookId-:userId', (req, res, next)=>{
    if(!req.session.userId){
        res.status(401).send({error: 'User not authenticated'});
        return;
    }

    review.findOne({bookId: req.params.bookId, userId: req.params.userId})
    .then(reviewData=>{
        if(!reviewData){
            res.status(404).send({error: 'user did not review this book'});
            return;
        }

        res.status(200).send(reviewData);
    })
    .catch(error=>{
        res.status(501).send({error:'Internal server error!'});
    })

})

//update the old review by user
router.put('/:reviewId', (req, res, next)=>{
    if(!req.session.userId){
        res.status(401).send({error: 'User not authenticated'});
        return;
    }

    if(!req.body){
        res.status(401).send({error: 'Incomplete request'});
        return;
    }

    const { rating, review } = req.body;

    if(!rating){
        res.status(401).send({error: 'Incomplete request'});
        return;
    }

    let updateObject = {'rating': rating};
    if(review){
        updateObject = {'rating': rating, 'review': review}
    }

    review.findOneAndUpdate({bookId: req.params.bookId, userId: req.params.userId}, updateObject)
    .then((review)=>{
        res.status(200).send({id: review.id});
    })
    .catch(error=>{
        res.status(501).send({error:'Internal server error!'});
    })
})

module.exports = router;