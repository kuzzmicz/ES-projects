
function checkE (type, value) {

    switch(type.tolowerCase){

        case 'email':
        case 'e-mail':
        case 'correo':

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ) {
                return "Invalid e-mail format";
            } else {
                return '';
            }


        case 'phone':

            if (! /(?=.*?[0-9])/.test(value) ) {
                return "Teléfono incorrecto";
            } else {
                return "";
            }

 

        case 'password':
        case 'password2':

            if(value.length < 8){
                return "Write 8 characters at least"
            } else {

                if (! /[\d()+-]/g.test(value) ) {
                    return "Invalid password";
                } else {
                    return "";
                }
            }

        default:
            console.log("what are you sending to me????");
        break;

    }

}

export default checkE;