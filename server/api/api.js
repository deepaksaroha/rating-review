import express from 'express'
import books from './books'
import reviews from './reviews'
import users from './users'

const router = express.Router();

router.use('/users', users);
router.use('/books', books);
router.use('/reviews', reviews);

module.exports = router;