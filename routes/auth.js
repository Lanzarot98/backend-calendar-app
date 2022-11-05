/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validar-campos');
const { createUser, revalidateToken, loginUser } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new', 
    [ // middlewares
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be more than 5 letters').isLength({ min: 6 }),
        validateFields
    ],
    createUser ); 

router.post(
    '/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required and must be more than 5 letters').isLength({ min: 6 }),
        validateFields
    ],
    loginUser ); 

router.get('/renew', validarJWT ,revalidateToken ); 


module.exports = router;






