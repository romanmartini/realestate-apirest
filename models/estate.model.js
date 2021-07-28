const { Schema, model, models } = require('mongoose');

const estateSchema = new Schema(
    {
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
        properties: [
            {
                type: Schema.Types.ObjectId,
                ref: "Property",
            }
        ],
        phone: {
            type: String,
            required: true
        },
        urlWhatsapp: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


estateSchema.statics.getManager = async function(managerId, key = false ){

    try{

        let userData = await models.User.findById(managerId);
        if( !userData ) throw new Error('manager id not found');

        if( key ){
            userData = userData.get(key);
            if( !userData ) throw new Error(`${key} not found`)
        } 
        return userData;
    
    }catch(err){
        console.log(err)
        return null;
    }
}


module.exports = model('Estate', estateSchema)