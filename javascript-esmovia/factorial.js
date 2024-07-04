async function factorial(a){
    let factorial=1;
    b = a;
    while(b>0){
        factorial *= b; 
        b--; 
    }
return factorial;
}
module.exports = {factorial}