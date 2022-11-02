const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const createUser = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email  });
        // console.log(usuario);
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'An user exist with that email'
            })
        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
        await usuario.save();
    
        res.status( 201 ).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please ask to the administrator'
        });
    }

}

const loginUser = (req, res = response) => {
    
    const { email, password } = req.body;

    res.status( 201 ).json({
        ok: true,
        msg: 'login',
        email,
        password,
    })

}

const revalidateToken = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'renew'
    })

}


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}





