let tareas =[];


class Tareas {

    constructor(id, descripcion, prioridad){
        this.id = id,
        this.descripcion = descripcion,
        this.prioridad = prioridad,
        this.estado = 'pendiente',
        this.fechaCreacion = new Date()
    };

}

let ultimoId = 0;

function crearId() {
    ultimoId++
    return ultimoId;
}

function addTask(descripcion, prioridad) {

    const id = crearId();

    let tareaNueva = new Tareas(id, descripcion, prioridad)

    tareas.push(tareaNueva);

    return tareaNueva;
}

function completarTarea(id) {
    
    const tareaEncontrada = tareas.find(tarea => tarea.id === id);

    const tarea = tareaEncontrada;
    
    if (tarea) {
        tarea.estado = 'completada';
    }
    else {console.log("Id no valido");}

    return tarea;
}

console.log("=== INICIO DEL PROGRAMA ===");

addTask("Estudiar JavaScript", "alta");
addTask("Hacer ejercicio", "media");
addTask("Leer un libro", "baja");

console.log("Tareas creadas:", tareas);

completarTarea(1);
completarTarea(3);

console.log("Después de completar tareas:", tareas);
