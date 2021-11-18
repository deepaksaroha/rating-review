const express = require('express')
const books = require('./books')
const reviews = require('./reviews')
const users = require('./users')

const router = express.Router();

router.use('/users', users);
router.use('/books', books);
router.use('/reviews', reviews);

module.exports = router;