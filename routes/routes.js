const express = require('express');
const userRoutes = require('./user.routes');
const propertyRoutes = require('./property.routes');
const estateRoutes = require('./estate.routes');

const app = express();
app.use( express.json() )
app.use( express.text() )


app.use( '/user', userRoutes );
app.use( '/property', propertyRoutes );
app.use( '/estate', estateRoutes );

app.use( (req, res) =>  {
    return res.status(404).json({
        code: 'ERR-404',
        success: false,
        message: 'Resource not found',
        data: null

    })
})

module.exports = app;