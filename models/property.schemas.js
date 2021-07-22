const { Schema, model } = require('mongoose');
const unequeValidator = require('mongoose-unique-validator');

const validCategory = {
    values: ['APARTAMENT', 'HOME', 'GARAGE', 'SHOP','OFFICE','DEPOSIT','BARN','LAND','HECTARES'],
    message: '{PATH} is not valid category'
}
const ValidContractType = {
    value: ['RENT', 'SALE'],
    message: '{VALUE} is not a valid contract'
}
// const ValidContractCurrency = {
//     value: ['ARS', 'UDS'],
//     message: '{VALUE} is not a valid currency'
// }


const propertySchema = new Schema({

    manager: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
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
        },
        contract: {
            type: {
                type: String,
                required: true,
                enum: ValidContractType
            },
            // currency: {
            //     type: String,
            //     enum: ValidContractCurrency
            // },
            price: {
                type: Number,
                required: true
            },
            expenses: {
                type: Number,
                required: true
            }
        }

    }

},
{
    timestamps: true
});

module.exports = model('Property', propertySchema)