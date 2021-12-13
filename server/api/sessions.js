const express = require('express')
const bcrypt = require('bcryptjs')
const { auth } = require('../middleware/auth')

const router = new express.Router();


//login status
router.get('/', auth, (req, res, next)=>{
    res.status(200).send({message: 'Login Successfull'});
})

//user login
router.post('/', (req, res, next)=>{
    if(!req.body){
        res.status(400).send('No information provided');
        return;
    }

    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).send({error: 'Email or password not present'});
        return;
    }

    UserCredential.findOne({ email: email })
    .then(user=>{
        if(!user){
            res.status(400).send({error:'User is not signed up'})
            return;
        }

        const match = bcrypt.compreSync(password, user.password);
        if (!match) {
            res.status(400).send({error: "Incorrect email or password"});
            return;
        }
        req.session.userId = user._id;
    })
    .catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
})

//user logout
router.delete('/', (req, res, next)=>{
    delete req.session.userId;
    res.status(204).send();
})

module.exports = router;