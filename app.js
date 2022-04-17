require('colors')

const { guardarDB, leerDB } = require('./helpers/guardar_archivo');
const { inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoBorrarTareas,
    confirmar,
    mostrarListadoChecklist, } 
    = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');



const main = async() => {
    let opt = ''
    // crear nueva instancia.
    const tareas = new Tareas();
    // Revisamos si el archivo de datos existe.
    const tareasDB = leerDB();
    
    if(tareasDB){
        // Establecer las tareas en caso de existir el archivo.
        tareas.cargarTareaFromArray(tareasDB)
    }

    // Ponemos una pausa para ver la tarea .
    // await inquirerPausa()
    do{
        // Imprimir el menú
       opt = await inquirerMenu()

       switch (opt) {
           case '1':
               // crear opción.
               const desc = await leerInput('Descripción: ');
               tareas.crearTarea( desc );

               break;

            case '2':       // Enlistar todas las tareas.
                tareas.listadoCompleto()
                
                break;

            case '3':       // Listar tareas completadas.
                tareas.listarPendientesCompletadas(true)
                
                break;
            
            case '4':       // Listar tareas pendientes.
                tareas.listarPendientesCompletadas(false)
            
                break;
            case '5':       //Completado | Pendiente.
                const ids = await mostrarListadoChecklist(tareas.listadoArray)
                tareas.toggleCompletadas(ids);
                
                break;
            
            case '6':       //Borrar tareas
                const id = await listadoBorrarTareas( tareas.listadoArray)
                if (id !== '0'){
                    // Mensaje de confirmación.
                    const ok = await confirmar( "¿Está seguro de que desea borrar?")
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada exitosamente.")
                    }
                }
                
                break;

           default:
               break;
       }
       
       
       guardarDB( tareas.listadoArray)

       await inquirerPausa()
    }
    while(opt !== '0');
    
    
}

main()
