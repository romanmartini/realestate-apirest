const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

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
        type: Schema.Types.ObjectId,
        ref: "Property",
    }],
    contact: {
        phone: {
            type: String,
            required: true
        },
        urlWhatsapp: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'email is required']
        }
    },
},
{
    timestamps: true
});

estateSchema.plugin( uniqueValidator, { message: 'The {PATH} is in use' });


module.exports = model('Estate', estateSchema)