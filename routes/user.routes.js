const { getAllUser, getUser, postUser, putUser, delUser } = require('../controllers/user.controllers');
const router = require('express').Router();

router.get('/', getAllUser);
router.get('/:_id', getUser);
router.post('/', postUser);
router.put('/:_id', putUser);
router.delete('/:_id', delUser);

module.exports = router;

