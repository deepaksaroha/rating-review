const express = require( 'express')
const user = require( '../db/models/users')
const { auth } = require('../middleware/auth');
const bcrypt = require( 'bcryptjs')

const router = express.Router();


//login status
router.get('/', auth, (req, res, next)=>{
    res.status(200).send({message: 'User is loggedin'});
})

//login user
router.put('/', (req, res, next)=>{

    const { emailId, password } = req.body;
    
    if(!emailId){
        res.status(400).send({error: 'EmailId not present!'});
        return;
    }

    if(!password){
        res.status(400).send({error: 'Password not present!'});
        return;
    }

    user.findOne({'emailId': emailId})
    .then(userData=>{
        if(!userData){
            res.status(401).send({error: 'User is not registered'});
            return;
        }

        const match = bcrypt.compareSync(password, userData.password);

        if(!match){
            res.status(401).send({error: 'Incorrect Email or Password!'});
            return;
        }

        req.session.userId = userData._id;
        res.status(200).send({userId: userData._id});
    })
    .catch(error=>{
        res.status(500).send({error: 'Internal Server Error'});
        return;
    })
})

//signup user
router.post('/', (req, res, next)=>{
    if(!req.body){
        res.status(400).send({error: 'No information provided'});
        return;
    }

    const { userName, emailId, password } = req.body;
    
    if(!userName || !emailId || !password){
        res.status(400).send({error: 'Incomplete Information'});
        return;
    }

    user.findOne({'emailId': emailId})
    .then(usr=>{
        if(usr){
            res.status(409).send({error: 'A user is already registered with this email', exists: true});
            return;
        }

        const passwordHash = bcrypt.hashSync(password);

        const userData = new user({userName: userName, emailId: emailId, password: passwordHash});


        userData.save()
        .then(()=>{
            res.status(201).send({id: userData.emailId});
            return;
        })
        .catch(error=>{
            res.status(500).send({error: 'Internal Server Error'});
            return;
        })
    })
    .catch(error=>{
        res.status(500).send({error: 'Internal Server Error'});
        return;
    })

})

//logout user
router.delete('/', (req, res, next)=>{
    if(req.session.userId !== undefined){
        delete req.session.userId;
    }
    res.status(204).send();
})


//get userName with user id
router.get('/:userId', (req, res, next)=>{

    user.findOne({'_id': req.params.userId})
    .then(usr=>{
        res.status(200).send({userName: usr.userName})
    })
    .catch(error=>{
        res.status(500).send({error: 'Internal Server Error'});
        return;
    })
})

module.exports = router;