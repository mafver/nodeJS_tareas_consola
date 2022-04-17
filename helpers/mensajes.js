const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {
    return new Promise(resolve=>{

        console.clear()
        console.log(" ============================ ".green)
        console.log("    Seleccione una opción     ".green)
        console.log(" ============================ \n".green)
    
        console.log(`${' 1. '.green} Crear Tarea`);
        console.log(`${' 2. '.green} Listar Tarea`);
        console.log(`${' 3. '.green} Listar Tareas Completadas`);
        console.log(`${' 4. '.green} Listar Tareas Pendientes`);
        console.log(`${' 5. '.green} Completar Tarea(s)`);
        console.log(`${' 6. '.green} Borrar Tarea`);
        console.log(`${' 7. '.green} Salir \n`);
    
        // Definir componentes para recibir información de usuario.
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        // Recibir información de usuario.
        readLine.question(" Selecione una opción: ", (opt) =>{
            readLine.close();
            resolve(opt)

        })



    })
    
}

const pausa = () =>{
    return new Promise(resolve =>{

        // Definir componentes para recibir información de usuario.
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        // Recibir información de usuario.
        readLine.question(`\n Presione ${'Enter'.green} para continuar \n`, (opt) =>{
            readLine.close();
            resolve(opt)
        })


    })
    
}


module.exports = {
    mostrarMenu, pausa
}