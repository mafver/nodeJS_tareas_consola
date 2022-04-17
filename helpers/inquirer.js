require('colors')

const inquirer = require('inquirer')


// definimos las preguntas.
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${' 1.'.red} Crear Tarea`
            },

            {
                value: '2',
                name: `${' 2.'.red} Listar Tareas`
            },

            {
                value: '3',
                name: `${' 3.'.red} Listar Tareas Completadas`
            },

            {
                value: '4',
                name: `${' 4.'.red} Listar Tareas Pendientes`
            },

            {
                value: '5',
                name: `${' 5.'.red} Completar Tarea(s)`
            },

            {
                value: '6',
                name: `${' 6.'.red} Borrar Tarea`
            },

            {
                value: '0',
                name: `${' 0.'.red} Salir`
            },

            
        ],
    }
]

const inquirerMenu = async() =>{

    console.clear()
    console.log(" ============================ ".green)
    console.log("    Seleccione una opción     ".gray)
    console.log(" ============================ \n".green)

    // Inquirer trabaja en base a promesas.
    const { opcion } = await inquirer.prompt(preguntas);

    return opcion

}

const inquirerPausa = async() =>{

    const pregPausa = [
        {
            type: 'input',
            name: 'enter',
            message: `\n Presione ${'enter'.green} para continuar \n`,
        },
    ]

    // Inquirer trabaja en base a promesas.
    await inquirer.prompt(pregPausa);

}

const leerInput = async(message) =>{
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate (value){
            if( value.length === 0){
                return "Por favor ingrese un valor"
            }
            return true
        }
    }

    const { desc } = await inquirer.prompt(question);
    return desc
}

// Creamos una función asíncrona para hacer el menú interactivo para borrar las tareas
const listadoBorrarTareas = async(tareas = []) =>{
    // Convertir hijos de los arreglos a parámetros deseados.

    const choices = tareas.map ((tarea,ind) =>{
        const idx = `${ind+1}`.green
        return{
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
        
        } 
    })
    // Añadir una opción adicional para volver atrás en caso de equivocarse de opción.
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    
    const { id } = await inquirer.prompt(preguntas);
    return id
}


// Creamos una función asíncrona para hacer el menú interactivo para borrar las tareas
const mostrarListadoChecklist = async(tareas = []) =>{
    // Convertir hijos de los arreglos a parámetros deseados.

    const choices = tareas.map ((tarea,ind) =>{
        const idx = `${ind+1}`.green
        const estado = (tarea.completadoEn)
                            ? true
                            : false;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: estado
        } 
    })
    // Añadir una opción adicional para volver atrás en caso de equivocarse de opción.
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    
    const { ids } = await inquirer.prompt(pregunta);
    return ids
}



const confirmar = async(mensaje) =>{
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            mensaje
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoBorrarTareas,
    mostrarListadoChecklist,
    confirmar
}