const Estate = require('../models/estate.schemas');

const getAllEstate = (req, res) => {

    return res.json({
        code: 'OK',
        success: true,
        message: 'getAllEstate',
        data: null

    })

}

const getEstate = (req, res) => {
    const id = req.params._id;
    return res.json({
        code: 'OK',
        success: true,
        message: 'getEstate',
        data: id

    })
}

const postEstate = (req, res) => {

    return res.json({
        code: 'OK',
        success: true,
        message: 'postEstate',
        data: null

    })


}

const putEstate = (req, res) => {

    const id = req.params._id;

    return res.json({
        code: 'OK',
        success: true,
        message: 'putEstate',
        data: null

    })


}

const delEstate = (req, res) => {

    const id = req.params._id;

    return res.json({
        code: 'OK',
        success: true,
        message: 'getEstate',
        data: id

    })


}

module.exports = {
    getAllEstate,
    getEstate,
    postEstate,
    putEstate,
    delEstate
}