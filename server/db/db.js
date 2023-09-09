const mongoose = require( 'mongoose')

exports.connectDB = _ =>{
    try{
        return mongoose.connect('mongodb+srv://RateReview:YkrVp1joxuof0F4i@cluster0.afyc4.mongodb.net/RRDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    }catch(error){
        console.log('Error Connecting to DB', error);
    }
}

exports.getClient = _ => {
    return mongoose.connection.getClient();
}
