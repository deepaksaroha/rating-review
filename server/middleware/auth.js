const auth=(req, res, next)=>{
    if(req.session.userId === undefined){
        res.status(401).send({error: 'User is not logged in'})
        return;
    }
    next();
}

module.exports = { auth }