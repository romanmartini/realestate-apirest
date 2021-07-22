const { Schema, model } = require('mongoose');
// const unequeValidator = require('mongoose-unique-validator');



const estateSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    logotype: {
        type: String,
        default: 'ADD PATH'
    },
    manager:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    properties: [{
        type: String
    }],
    contact: {
        phone: {
            type: String
        },
        urlWhatsapp: {
            type: String
        }
    },
},
{
    timestamps: true
});

// usuarioSchema.plugin( uniqueValidator, { message: 'The {PATH} is in use' });


module.exports = model('Estate', estateSchema)