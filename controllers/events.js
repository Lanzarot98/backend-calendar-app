
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

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist with that id'
            })
        }

        if (event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'you do not have privilege to edit this event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ask to the administrator'
        });
    }

}

const deleteEvent = async ( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist with that id'
            })
        }

        if (event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'you do not have privilege to eliminate this event'
            })
        }

        const eventDeleted = await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            event: eventDeleted
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ask to the administrator'
        });
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}








