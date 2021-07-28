const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validRoles = {
    values: ['ADMIN', 'USER', 'ESTATE_MANAGER'],
    message: '{VALUE} is not a valid role'
}

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required']
    },
    surname: {
        type: String,
        required: [true, 'surname is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    img: {
        type: String,
        default: 'ADD PATH'
    },
    role: [
        {
            type: String,
            default: 'USER',
            enum: validRoles
        }
    ],
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

userSchema.plugin( uniqueValidator, { message: 'The {PATH} is in use' });

userSchema.methods.toJSON = function(){

    const { password, createdAt, updatedAt, __v, ...rest } = this.toObject();
    return rest;

}


module.exports = model('User', userSchema)