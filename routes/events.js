/* 
    Event Routes
    /api/event
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// todas tienen que pasar por la validación del JWT
router.use( validarJWT )

// Obtener eventos
router.get( '/', getEvents );

// crear un nuevo evento
router.post( '/', createEvent );

// actualizar evento
router.put( '/:id', updateEvent );

// actualizar evento
router.delete( '/:id', deleteEvent );


module.exports = router;