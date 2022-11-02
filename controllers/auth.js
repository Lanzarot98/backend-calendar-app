const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

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
        // Generar el json web token 
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status( 201 ).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token 
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please ask to the administrator'
        });
    }

}

const loginUser = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });
        // console.log(usuario);
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'The user does not exist with that email' // no se recomienda decirle cual esta mal, pero para nuestro caso dejaremos así
            })
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        // Generar nuestro JSON WEB TOKEN
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please ask to the administrator'
        });
    }


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





