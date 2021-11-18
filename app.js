
const api = require('./server/api/api')
const db = require('./server/db/db')


const genuuid = require('uuid').v4;
const MongoStore = require('connect-mongo')
const path = require('path');

const session = require('express-session')
const express  = require('express');
const app = express();

const port = process.env.PORT || 4000;

db.connectDB()
.then(()=>{
    app.use('/api', session({
        genid(){
            return genuuid();
        },
        store: new MongoStore({ client: db.getClient() }),
        secret: 'qwertyuiop',
        resave: false,
        saveUninitialized: true
    }), api);

    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (req, res, next)=>{
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })

    app.listen(port, ()=>{
        console.log(`Server listening at port: ${port}`);
    })

})

