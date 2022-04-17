/**
 * _listado;
 *       { 'uuid-1253653-2323-4':{id:12,desc:asf,completadoEn:87342}}
 */

const Tarea = require("./tarea");

/***
 * Para verificar que funcionan
   const tareas = new Tareas();
   const tarea = new Tarea('Comprar Comida')
       
   tareas._listado[tarea.id] = tarea;
   console.log(tareas)
   console.log(tarea)
 */
class Tareas {

    _listado = {}

    // Añadir propiedad extra a nuestro listado.
    get listadoArray(){
        const listado = []
        Object.keys(this._listado).forEach( key =>{
            listado.push(this._listado[key])
        })

        return listado

    }

    constructor(){
        this._listado = {};

    }

    // métodos.
    cargarTareaFromArray( tareas = []){
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea 
        });
    }

    // borrar elemento de la lista.
    borrarTarea( id='' ){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }
    crearTarea( descr = '' ){
        // Crear nueva instancia.
        const tarea = new Tarea(descr);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        // 1. Tarea :: Completada | Pendiente.
        // Definimos nuestro array
        
        this.listadoArray.forEach( (tarea,index) =>{
            const idx = `${1+index}`.green
            // Seleccionamos los parámetros de descripción y completado. (Como es un diccionario, podemos definir los parámetros de esta forma.
            const { descripcion, completadoEn } = tarea
            // Definimos el estado según el valor de completadoEn
            const estado = (completadoEn)
                                ? 'Completado'.green
                                : 'Pendiente'.red
            console.log(`${idx} ${descripcion} :: ${estado}`)
            
        })


    }

    listarPendientesCompletadas (completo = true){
        // Método donde se muestra si la tarea está pendiente o completa.
        let ind = 0;
        this.listadoArray.forEach((tarea) =>{
            const { descripcion, completadoEn } = tarea
            // En caso de tener la opción de completo..
            if (completo){
                if (completadoEn){
                    ind += 1
                    console.log(`${(ind+'.').green} ${descripcion} :: ${completadoEn.green}.`)
                }
            }
            else{
                if (!completadoEn){
                    ind += 1
                    console.log(`${(ind+'.').green} ${descripcion} :: ${"Pendiente".red}.`)
                }
            }
        })   
    }

    toggleCompletadas( ids = []){
        ids.forEach( id =>{
            const tarea = this._listado[id];
            if ( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArray.forEach( tarea =>{
            // Si en el listado no se incluye el id del objeto.
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })
    }

    
}



module.exports = Tareas;
