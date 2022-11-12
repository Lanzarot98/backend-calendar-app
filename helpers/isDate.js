const moment = require('moment')


const isDate = ( value ) => {

    // si retorna falso quiere decir que este campo no es correcto, por lo que la validación falla
    if ( !value ) {
        return false;
    }

    // moment me indica si es una fecha correcta o no
    const date = moment( value );
    if ( date.isValid() ) {
        return true;
    } else {
        return false;
    }

}



module.exports = {
    isDate
};






