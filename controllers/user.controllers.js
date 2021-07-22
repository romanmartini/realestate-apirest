const User = require('../models/user.schemas');

const getAllUser = (req, res) => {

    return res.json({
        code: 'OK',
        success: true,
        message: 'getAllUser',
        data: null

    })

}

const getUser = (req, res) => {
    const id = req.params._id;
    return res.json({
        code: 'OK',
        success: true,
        message: 'getUser',
        data: id

    })
}

const postUser = (req, res) => {

    return res.json({
        code: 'OK',
        success: true,
        message: 'postUser',
        data: null

    })


}

const putUser = (req, res) => {

    const id = req.params._id;

    return res.json({
        code: 'OK',
        success: true,
        message: 'putUser',
        data: null

    })


}

const delUser = (req, res) => {

    const id = req.params._id;

    return res.json({
        code: 'OK',
        success: true,
        message: 'getUser',
        data: id

    })


}

module.exports = {
    getAllUser,
    getUser,
    postUser,
    putUser,
    delUser
}