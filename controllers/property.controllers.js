// const Property = require('../models/property.schemas');

const getAllProperty = (req, res) => {

    return res.json({
        code: 'OK',
        success: true,
        message: 'getAllProperty',
        data: null

    })

}

const getProperty = (req, res) => {
    const id = req.params._id;
    return res.json({
        code: 'OK',
        success: true,
        message: 'getProperty',
        data: id

    })
}

const postProperty = (req, res) => {

    return res.json({
        code: 'OK',
        success: true,
        message: 'postProperty',
        data: null

    })


}

const putProperty = (req, res) => {

    const id = req.params._id;

    return res.json({
        code: 'OK',
        success: true,
        message: 'putProperty',
        data: null

    })


}

const delProperty = (req, res) => {

    const id = req.params._id;

    return res.json({
        code: 'OK',
        success: true,
        message: 'getProperty',
        data: id

    })


}

module.exports = {
    getAllProperty,
    getProperty,
    postProperty,
    putProperty,
    delProperty
}