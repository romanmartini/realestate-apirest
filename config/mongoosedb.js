const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect( process.env.CONNECTION_DB, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true

        }, (err, res) => {

            if( err ) throw err;
            console.log('Connection db successfully')
        
        })

    } catch (err) {

        console.log(err)

    }

}

module.exports = dbConnection;
