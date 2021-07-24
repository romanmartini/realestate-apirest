const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validCategory = {
    values: ['APARTAMENT', 'HOME', 'GARAGE', 'SHOP','OFFICE','DEPOSIT','BARN','LAND','HECTARES'],
    message: '{PATH} is not valid category'
}
const validContractType = {
    values: ['RENT', 'SALE'],
    message: '{VALUE} is not a valid contract'
}
const validContractCurrency = {
    values: ['ARS', 'UDS'],
    message: '{VALUE} is not a valid currency'
}


const propertySchema = new Schema({

    estateManager : {
        type: Schema.Types.ObjectId,
        ref: "Estate",
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
        enum: validCategory
    },
    contract: {
        type: {
            type: String,
            required: true,
            enum: validContractType
        },
        currency: {
            type: String,
            defaul: "ARS",
            enum: validContractCurrency
        },
        price: {
            type: Schema.Types.Decimal128,
            required: true
        },
        expenses: {
            type: Schema.Types.Decimal128,
            required: true
        }
    },
    data: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: Array
        },
        room: {
            type: Number
        },
        bathroom: {
            type: Number
        },
        bedroom: {
            type: Number
        },

        balcony: {
            type: Number
        },
        garage: {
            type: Number
        },
        yard: {
            type: Boolean
        },
        lightYard: {
            type: Number
        },
        totalArea: {
            type: Number
        },
        coveredArea: {
            type: Number
        },
        isNew: {
            type: Boolean,
            required: true
        },
        location: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            region: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            lat: {
                type: String
            },
            lon: {
                type: String
            }
        }
        

    }

},
{
    timestamps: true
});

propertySchema.plugin( uniqueValidator, { message: 'The {PATH} is in use' });

module.exports = model('Property', propertySchema)