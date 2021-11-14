import express from 'express'
import session from 'express-session'
import genuuid from 'uuid'
import MongoStore from 'connect-mongo'
import path from 'path'

import api from './server/api/api'
import db from './server/db/db'

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

