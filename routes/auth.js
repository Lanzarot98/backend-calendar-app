/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, revalidateToken, loginUser } = require('../controllers/auth')

router.post(
    '/new', 
    [ // middlewares
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be more than 5 letters').isLength({ min: 6 }),
    ],
    createUser ); 

router.post(
    '/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required and is more than 5 letters').isLength({ min: 6 }),
    ],
    loginUser ); 

router.get('/renew', revalidateToken ); 


module.exports = router;






