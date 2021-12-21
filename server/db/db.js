const mongoose = require( 'mongoose')

exports.connectDB = _ =>{
    try{
        return mongoose.connect('mongodb://localhost/RRDB', {useNewUrlParser: true, useUnifiedTopology: true})
    }catch(error){
        console.log('Error Connecting to DB', error);
    }
}

exports.getClient = _ => {
    return mongoose.connection.getClient();
}
