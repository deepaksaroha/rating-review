import express from 'express'
import user from '../db/models/users'
import bcrypt from 'bcryptjs'

const router = express.Router();


//login user
router.get('/', (req, res, next)=>{
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
            res.status(400).send({error: 'User is not registered'});
            return;
        }

        const match = bcrypt.compareSync(password, userData.password);

        if(!match){
            res.status(401).send({error: 'Incorrect Email or Password!'});
            return;
        }

        req.session.userId = userData._id;
        res.status(200).send({emailId: userData.emailId});
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
    .then(user=>{
        if(user){
            res.status(400).send({error: 'A user is already registered with this email'});
            return;
        }

        const passwordHash = bcrypt.hashSync(password);

        const userData = new user({userName, emailId, password: passwordHash});

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
    delete req.session.userId;
    res.status(204).send();
})

module.exports = router;