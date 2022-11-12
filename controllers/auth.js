const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email  });
        // console.log(usuario);
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'An user exist with that email'
            })
        }

        user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
        await user.save();
        // Generar el json web token 
        const token = await generarJWT( user.id, user.name );
    
        res.status( 201 ).json({
            ok: true,
            uid: user.id,
            name: user.name,
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
        
        const user = await User.findOne({ email });
        // console.log(user);
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'The user does not exist with that email' // no se recomienda decirle cual esta mal, pero para nuestro caso dejaremos así
            })
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        // Generar nuestro JSON WEB TOKEN
        const token = await generarJWT( user.id, user.name );

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
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

const revalidateToken = async (req, res = response) => {
    
    const { uid, name } = req;
    // ó también se puede asi:
    // const uid = req.uid;
    // const name = req.name;

    // generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        // uid,
        // name,
        token
    })

}


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}





