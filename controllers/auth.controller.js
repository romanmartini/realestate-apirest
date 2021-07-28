const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    
    const {email, password} = req.body;

    try{
        
        const user = await User.findOne({ email });
        if ( !user || !bcrypt.compareSync(password, user.password ) ) {
            return res.status(400).json({
                code: 'AUTH-ERR',
                message: 'Invalid email or password',
                success: false,
                data: null
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, { expiresIn: '1h' });

        return res.json({
            code: "OK",
            message: 'Login',
            success: true,
            data: {
                user,
                token
            }
        })

    }catch(err){
        return res.status(500).json({
            code: "ERR",
            message: err.message,
            success: false,
            data: err
        })
    }


}

const signIn = async (req, res) => {

    const {password, ...rest} = req.body;
    
    rest.password = bcryptjs.hashSync(password, 10);
    
    try{

        const user = await User.create(rest);
        
        return res.status(201).json({
            code: 'OK',
            success: true,
            message: 'Sign In',
            data: user
        });

    }catch(err){
        let message = err.message || "An unexpected error occurred";
        return res.status(400).json({
            code: 'ERR',
            success: false,
            message,
            data: err
            
        })
    }


}

module.exports = {
    login,
    signIn
}