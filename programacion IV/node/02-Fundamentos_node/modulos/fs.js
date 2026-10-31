const fs = require("fs");

// primero leemos el archivo.txt
function leer(ruta, cb){
    fs.readFile(ruta, (err, data) => {
        console.log(data.toString());
    })
}

// leer(`${__dirname}/archivo.txt`, console.log); // sintaxis ES6


// segundo escribimos el archivo1.txt creandolo
function escribir(ruta, contenido, cb){
    fs.writeFile(ruta, contenido, function(err){
        if (err) {
            console.log("No se ha podido escribir", err);
        }else{
            console.log("Se ha escrito correctamente");
        }
    });
}

// tercero eliminamos el archivo1.txt
function borrar(ruta, cb){
    fs.unlink(ruta,cb); // elimina de manera asincrona
}

borrar(`${__dirname}/archivo1.txt`, console.log);
//escribir(`${__dirname}/archivo1.txt`, "Reescribimos eel archivo" ,console.log)
//leer(`${__dirname}/archivo1.txt`, console.log); // sintaxis ES6
