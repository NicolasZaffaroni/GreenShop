//Aplicando Set interval y funciones intervalicas


let timer =setInterval(countTimes,1000)
let times = 0;
function countTimes(){
    times++;
    console.log(times);
    if(times===10){
        //limpiar el count cuando llega a 10 por eso a condiciones if
        clearInterval(timer)
    }
}

//Funciones Asincronicas


function createUser(username,age,callback){
    setTimeout(function(){
        callback({
            name: username,
            age: age,
        });
    },2000);
}


function ok (user){
    console.log('El usuario' + user.name + 'se creo correctamente');
}





//Promesas 

createUser('nicolas',20,ok)
    .then(ok);



    //Error try y catch


    try {
        // Intentamos dividir un número por otro
        let numerador = 10;
        let denominador = 0;
        let resultado = numerador / denominador;
    
        if (!isFinite(resultado)) {
            throw new Error("No se puede dividir por cero.");
        }
    
        console.log("El resultado es:", resultado);
    
    } catch (error) {
        // Este bloque se ejecuta si ocurre un error
        console.error("Error:", error.message);
    }
