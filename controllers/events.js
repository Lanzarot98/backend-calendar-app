
const { response } = require('express');
const Event = require('../models/Event'); 

const getEvents = async ( req, res = response ) => {

    const events = await Event.find()
                            .populate('user', 'name');

    res.json({
        ok: true,
        events
    })

}

const createEvent = async ( req, res = response ) => {

    // verificar que tenga el evento.
    // console.log( req.body )

    const event = new Event( req.body ); // instancia de mi modelo para poder trabajar

    try {
       
        event.user = req.uid;
        
        const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please ask to the administrator'
        });
    }

}

const updateEvent = async ( req, res = response ) => {

    res.status(201).json({
        ok: true,
        msg: 'updateEvent'
    })

}

const deleteEvent = async ( req, res = response ) => {

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








