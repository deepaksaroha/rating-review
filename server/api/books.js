import express from 'express'
import book from '../db/models/books'

const router = express.Router();

//all books information
router.get('/', (req, res, next)=>{
    book.find()
    .then(books=>{
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

    book.findOne({bookId: req.params.bookId})
    .then(bookData=>{
        if(!bookData){
            res.status(400).send({error: 'Invalid bookId'});
            return;
        }

        res.status(200).send(bookData);
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