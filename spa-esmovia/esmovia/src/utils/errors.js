
function checkE (type, value) {

    switch(type){

        case 'name':

            if(value.length < 5){
                return "Name must be at least of 5 characters"
            } else {
                return ""
            }

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

            if(value.length < 6){
                return "Write 6 characters at least"
            } else {
                return ""
            }

        default:
            console.log("what are you sending to me????");
        break;

    }

}

export default checkE;