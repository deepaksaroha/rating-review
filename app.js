const express = require('express')
const { connectDB, getClient } = require('./server/db/db')
const session = require('express-session')
const genuuid = require('uuid').v4;
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;
const api = require('./server/api/api')

connectDB()
.then(() => {
    
    console.log('some thing is happening');

    //Handle /api with the api middleware
    app.use(express.json());
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
