const router = require('express').Router();

const { login, signIn } = require('../controllers/auth.controller');
const { validateLogin, validateSignIn } = require('../middlewares/validate-auth')

router.post('/login', validateLogin, login);
router.post('/signin', validateSignIn, signIn);

module.exports = router;    