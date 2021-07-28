const Estate = require('../models/estate.model');

const getAllEstate = async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skipIndex = (page - 1) * limit;
    const orderBy = req.query.orderby;

    try {
        const count = await Estate.countDocuments();
        const estates = await Estate.find()
            .sort(orderBy)
            .limit(limit)
            .skip(skipIndex)
            .populate( "manager", "name email" );

        const pages = Math.ceil(count / limit);

        return res.json({
            code: 'OK',
            success: true,
            message: 'getAllEstate',
            data: {
                count,
                pages,
                estates
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

const getEstate = async (req, res) => {

    try {
        
        const estate = await Estate.findById({_id: req.params._id})
        if( !estate ){
            return res.status(404).json({
                code: 'NOT-FOUND',
                success: false,
                message: 'The estate id could not be found',
                data: null
                
            })
        }
        return res.json({
            code: 'OK',
            success: true,
            message: 'getEstate',
            data: estate
            
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

const postEstate = async(req, res) => {

    try{
        const estate = await Estate.create({ ...req.body });
        
        return res.json({
            code: 'OK',
            success: true,
            message: 'postEstate',
            data: estate
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

const putEstate = async (req, res) => {

    try{

        const estate = await Estate.findByIdAndUpdate({_id: req.params._id}, {...req.body}, {new: true, runValidators: true});
        if( !estate ){
            return res.status(404).json({
                code: 'NOT-FOUND',
                success: false,
                message: 'Estate not found',
                data: null
            })
        }

        return res.json({
            code: 'OK',
            success: true,
            message: 'Update estate',
            data: estate
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

const delEstate = async (req, res) => {

    try {

        const estate = await Estate.deleteOne({_id: req.params._id});
        if( !estate ){
            return res.status(404).json({
                code: 'NOT-FOUND',
                success: false,
                message: 'The Estate Id could not be found',
                data: null
            })
        }

        return res.json({
            code: 'OK',
            success: true,
            message: 'Delete estate',
            data: estate
        
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
    getAllEstate,
    getEstate,
    postEstate,
    putEstate,
    delEstate
}