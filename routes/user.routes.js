const { getAllUser, getUser, putUser, delUser } = require('../controllers/user.controller');
const { validateRoles } = require('../middlewares/validate-auth');
const router = require('express').Router();

router.get('/', validateRoles('USER'), getAllUser);
router.get('/:_id', getUser);
router.put('/:_id', putUser);
router.delete('/:_id', delUser);

module.exports = router;

