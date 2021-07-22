require('dotenv').config()
const express = require('express');
const routes = require('./routes/routes');
const dbConnection = require('./config/mongoosedb')


const app = express();
dbConnection()

app.use( routes )


app.listen(process.env.PORT, () => {
    console.log(`Run port ${process.env.PORT}`)
})