const Property = require('../models/property.schemas');

const getAllProperties = async (req, res) => {
    
    try {
        const properties = await Property.find()
            .populate( "manager", "name email" );

        return res.json({
            code: 'OK',
            success: true,
            message: 'getAllproperties',
            data: properties
        
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

const getProperty = async (req, res) => {

    try {
        
        const property = await Property.findById({_id: req.params._id})
        if( !property ){
            return res.status(400).json({
                code: 'ERR',
                success: false,
                message: 'Property id not found',
                data: null
                
            })
        }
        return res.json({
            code: 'OK',
            success: true,
            message: 'getProperty',
            data: property
            
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

const postProperty = async(req, res) => {

    const { estateManager, status, category, contractType, price, expenses, 
        title, description, image, room, bathroom, bedroom, balcony, 
        garage, yard, lightYard, totalArea, coveredArea, isNew, 
        address, city, region, country, lat, lon } = req.body;

    try{
        const property = await Property.create({ 

            estateManager,
            status,
            category,
            contract: {
                type: contractType,
                price,
                expenses,
            },
            data: {
                title,
                description,
                image,
                room,
                bathroom,
                bedroom,
                balcony,
                garage,
                yard,
                lightYard,
                totalArea,
                coveredArea,
                isNew,
                location: {
                    address,
                    city,
                    region,
                    country,
                    lat,
                    lon,
                }
            }
        });
        
        return res.json({
            code: 'OK',
            success: true,
            message: 'postProperty',
            data: property
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

const putProperty = async (req, res) => {

    try{

        const { status, category, contractType, price, expenses, 
            title, description, image, room, bathroom, bedroom, balcony, 
            garage, yard, lightYard, totalArea, coveredArea, isNew, 
            address, city, region, country, lat, lon } = req.body;

        const property = await Property.findByIdAndUpdate({_id: req.params._id}, { 

            status,
            category,
            contract: {
                type: contractType,
                price,
                expenses,
            },
            data: {
                title,
                description,
                image,
                room,
                bathroom,
                bedroom,
                balcony,
                garage,
                yard,
                lightYard,
                totalArea,
                coveredArea,
                isNew,
                location: {
                    address,
                    city,
                    region,
                    country,
                    lat,
                    lon,
                }
            }
        }, {new: true});
        
        return res.json({
            code: 'OK',
            success: true,
            message: 'Update Property',
            data: property
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

const delProperty = async (req, res) => {

    try {

        const property = await Property.deleteOne({_id: req.params._id});
        
        return res.json({
            code: 'OK',
            success: true,
            message: 'Delete Property',
            data: property
        
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
    getAllProperties,
    getProperty,
    postProperty,
    putProperty,
    delProperty
}