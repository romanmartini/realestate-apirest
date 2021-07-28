const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Joi = require('joi')

const validateToken = async (req, res, next) => {

    if( req.url === '/auth/login' || req.url === '/auth/signin' ) return next();

    const authorization = req.headers.authorization;

    if ( !authorization ) {
        return res.status(401).json({
            code: 'AUTH-ERR',
            message: 'Token authorization must be provided',
            success: false,
            data: null
        })
    }

    try {

        const token = authorization.split(' ')[1];

        const { _id } = jwt.verify( token, process.env.PRIVATE_KEY );
        
        const user = await User.findById( _id );
        if ( !user ) {
            return res.status(401).json({
                code: 'AUTH-ERR',
                message: 'User does not exist',
                success: false,
                data: null
            })
        }  

        req.user = user;
        return next()
        
    }catch(err){

        console.log(err)
        return res.status(400).json({
            code: 'AUTH-ERR',
            success: false,
            message: err.message,
            data: err
        })

    }
}

const validateLogin = async (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    try {

        await schema.validateAsync(req.body)
        return next();

    }catch(err){

        return res.status(400).json({
            code: 'VALIADATION-ERR',
            message: null,
            success: false,
            data: err
        });

    }

}

const validateSignIn = async (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.array().items(
            Joi.string()
            .valid('ADMIN', 'USER', 'ESTATE_MANAGER')
        ).max(3).required()
    });

    try {

        await schema.validateAsync(req.body);
        return next(); 

    } catch (err) {

        return res.status(400).json({
            code: 'VALIADATION-ERR',
            message: err.details[0].message,
            success: false,
            data: null
        });

    }
}

const validateRoles = (roles) => {
    
    return (req, res, next) => {

        const user = req.user;

        if ( !user.role.includes(roles) ) {
            return res.status(403).json({
                code: 'AUTH-ERR',
                message: 'Resticted access',
                success: false,
                data: null
            })
        }

        return next();
    }
}


module.exports = {
    validateToken,
    validateLogin,
    validateSignIn,
    validateRoles

}