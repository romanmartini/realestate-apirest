const User = require('../models/user.model');
const bcrypt = require('bcrypt');


const getAllUser = async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skipIndex = (page - 1) * limit;
    const orderBy = req.query.orderby;

    try {
        const count = await User.countDocuments();
        const users = await User.find(null, 'name surname email img role status google')
            .sort(orderBy)
            .limit(limit)
            .skip(skipIndex)   
        
        const pages = Math.ceil(count / limit);

        return res.json({
            code: 'OK',
            success: true,
            message: 'getAllUser',
            data: {
                count,
                pages,
                users
            }
        
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
            return res.status(404).json({
                code: 'NOT-FOUND',
                success: false,
                message: 'The user id could not be found',
                data: null
                
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



const putUser = async (req, res) => {

    try{
        const { name, surname, img, role, status } = req.body; 
        const user = await User.findByIdAndUpdate({_id: req.params._id}, { name, surname, img, role, status }, {new: true, runValidators: true});
        if( !user ){
            return res.status(404).json({
                code: 'NOT-FOUND',
                success: false,
                message: 'User not found',
                data: null
            })
        }

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
    putUser,
    delUser
}