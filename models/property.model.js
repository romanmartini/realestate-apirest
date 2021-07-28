const { Schema, model, models } = require('mongoose');
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
            type: Number,
            required: true
        },
        expenses: {
            type: Number,
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

propertySchema.methods.pushToEstate = async function(req){

    const property = this;
    
    try{

        let estateDB = await models.Estate.findById(property.estateManager);
        if( !estateDB ) throw new Error('NOT-FOUND: Estate not found');

        if (estateDB.properties.indexOf(property._id) < 0) estateDB.properties.push(property._id);
        
        estateDB = await estateDB.save();
        if( !estateDB ) throw new Error('Could not save');

        return true;
 
    }catch(err){
        if (req.method === 'POST') await models.Property.deleteOne({ _id: property._id });
        console.log(err);
        return false;
    }

}

propertySchema.statics.spliceToEstate = async function(propertyId) {

    try {

        const property = await models.Property.findById(propertyId);
        if( !property ) throw new Error('NOT-FOUND: property._id was not found on the Estate');

        let EstateDB = await models.Estate.findById(property.estateManager);
        if( !EstateDB ) throw new Error('NOT-FOUND: Estate could not be found');

        EstateDB.properties.splice(EstateDB.properties.indexOf(property._id), 1);
        
        EstateDB = await EstateDB.save();
        if( !EstateDB ) throw new Error('SERVER-ERR: Could not save');

        return {success: true}

    } catch (err) {
        return {success: false, message: err.message}
    }
}

module.exports = model('Property', propertySchema)