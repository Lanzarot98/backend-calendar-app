
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');

const getEvents = async ( req, res = response ) => {

    const { uid, name } = req;

    // generar token
    // const token = await generarJWT(uid, name );

    res.status(201).json({
        ok: true,
        msg: 'getEvents',
    })

}

const createEvent = async ( req, res = response ) => {

    // const { uid, name } = req;

    // generar token
    // const token = await generarJWT(uid, name );

    // verificar que tenga el evento.
    console.log( req.body )

    res.status(201).json({
        ok: true,
        msg: 'createEvent'
    })

}

const updateEvent = async ( req, res = response ) => {

    const { uid, name } = req;

    // generar token
    // const token = await generarJWT(uid, name );

    res.status(201).json({
        ok: true,
        msg: 'updateEvent'
    })

}

const deleteEvent = async ( req, res = response ) => {

    const { uid, name } = req;

    // generar token
    // const token = await generarJWT(uid, name );

    res.status(201).json({
        ok: true,
        msg: 'deleteEvent'
    })

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}








