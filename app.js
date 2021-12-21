const express = require('express')
const { connectDB, getClient } = require('./server/db/db')
const session = require('express-session')
const genuuid = require('uuid').v4;
const MongoStore = require('connect-mongo');
const path = require('path');
const Book = require('./server/db/models/books')

const app = express();
const port = process.env.PORT || 4000;
const api = require('./server/api/api')

connectDB()
.then(() => {
    console.log('sada')
    const Bookdata = new Book({ title: "Opening Places: An Anthology of Contemporary African Women's Writing", bookId: "5", author: "Yvonne Vera", edition: "1", descriptions: "In this anthology the award-winning author Yvonne Vera brings together the stories of many talented writers from different parts of Africa.", isbn: "9780435910106", languages: ["English", "African"], availability: { "amazon": true, "Flipkart": false, "kindle": false } });
    Bookdata.save();

    //Handle /api with the api middleware
    app.use('/api', session({
        genid() {
            return genuuid() // use UUIDs for session IDs
        },
        store: new MongoStore({ client: getClient() }),
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }), api);

    app.use(express.static(path.join(__dirname, 'build')));

    //Return index.html for routes not handled by build folder
    app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    //Start listening on port
    app.listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });
})