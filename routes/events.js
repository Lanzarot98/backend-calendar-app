/* 
    Event Routes
    /api/event
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// todas tienen que pasar por la validación del JWT
router.use( validarJWT )

// Obtener eventos
router.get( '/', getEvents );

// crear un nuevo evento
router.post( 
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validateFields
    ],
    createEvent 
);

// actualizar evento
router.put( '/:id', updateEvent );

// actualizar evento
router.delete( '/:id', deleteEvent );


module.exports = router;