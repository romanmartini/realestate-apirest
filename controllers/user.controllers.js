const User = require('../models/user.schemas');
const bcrypt = require('bcrypt');


const getAllUser = async (req, res) => {
    
    try {
        const users = await User.find();

        return res.json({
            code: 'OK',
            success: true,
            message: 'getAllUser',
            data: users
        
        })

    } catch (err) {
        
        let message = err.message || "Ocurred an Error";
        return res.status(400).json({
            code: 'ERR',
            success: false,
            message,
            data: err
            
        })

    }
    

}

const getUser = async (req, res) => {

    try {
        
        const user = await User.findById({_id: req.params._id})
        if( !user ){
            return res.status(400).json({
                code: 'ERR',
                success: false,
                message: 'The user id could not be found',
                data: user
                
            })
        }
        return res.json({
            code: 'OK',
            success: true,
            message: 'getUser',
            data: user
            
        })
    } catch (err) {
        
        let message = err.message || "An unexpected error occurred";
        return res.status(400).json({
            code: 'ERR',
            success: false,
            message,
            data: err
            
        })
    }
}

const postUser = async(req, res) => {

    try{
        const {name, surname, email, password, role} = req.body;
        const user = await User.create({
            name,
            surname,
            email,
            password: bcrypt.hashSync(password, 10),
            role
        });
        
        return res.json({
            code: 'OK',
            success: true,
            message: 'postUser',
            data: user
        })

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

const putUser = async (req, res) => {

    try{

        const user = await User.findByIdAndUpdate({_id: req.params._id}, {...req.body}, {new: true});
        
        return res.json({
            code: 'OK',
            success: true,
            message: 'Update user',
            data: user
        })
        
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

const delUser = async (req, res) => {

    try {

        const user = await User.deleteOne({_id: req.params._id});
        if( !user ){
            return res.json({
                code: 'ERR',
                success: false,
                message: 'The user Id could not be found',
                data: null
            
            })
        }
        return res.json({
            code: 'OK',
            success: true,
            message: 'Delete User',
            data: user
        
        })

    } catch (err) {
        
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
    getAllUser,
    getUser,
    postUser,
    putUser,
    delUser
}