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

function filtrarTareas(estado) {

    const estadosValidos = ["todas", "completada", "pendiente"];
    
    if (!estadosValidos.includes(estado)) {
        return "Estado no válido";
    }
    
    if (estado === "todas") return tareas;
    return tareas.filter(t => t.estado === estado);
}

function obtenerEstadisticas() {
    
    const totalDeTareas = tareas.length;

    const totalCompletadas = filtrarTareas('completada').length;

    const totalPendientes = filtrarTareas('pendiente').length;

    return {
        total: totalDeTareas,
        completadas: totalCompletadas,
        pendientes: totalPendientes
    }
}

function eliminarTarea(id) {

    const indice = tareas.findIndex(tarea => tarea.id === id);

    if (indice !== -1) {
        tareas.splice(indice, 1);
        return true
    }else{
        return false
    }
}


function mostrarTareas(tareasAMostrar = tareas) {

    const listaTareas = document.getElementById('listaTareas');

    listaTareas.innerHTML = '';

    tareasAMostrar.forEach(tarea => {
        const elemento = document.createElement('div');
        elemento.className = `tarea ${tarea.estado}`;

        elemento.innerHTML = `
        <span class="descripcion">${tarea.descripcion}</span>
        <span class="prioridad ${tarea.prioridad}">${tarea.prioridad}</span>
        <span class="estado">${tarea.estado}</span>
        <button onclick="completarTareaUI(${tarea.id})">Completar</button>
        <button onclick="eliminarTareaUI(${tarea.id})">Eliminar</button>
        `;

        listaTareas.appendChild(elemento);
    });
}

function agregarTareaDesdeUI() {
    const input = document.getElementById('inputTarea');
    const select = document.getElementById('selectPrioridad');

    const descripcion = input.value.trim();
    const prioridad = select.value;

    if (descripcion === '') {
        alert('Por favor, escribe una descripción');
        return;
    }

    addTask(descripcion, prioridad);

    input.value = '';
    mostrarTareas();
    actualizarEstadisticas();
}

function completarTareaUI(id) {
    completarTarea(id);
    mostrarTareas();
    actualizarEstadisticas();
}

function eliminarTareaUI(id) {
    eliminarTarea(id);
    mostrarTareas();
    actualizarEstadisticas();
}

function actualizarEstadisticas() {
    
    const stats = obtenerEstadisticas();
    
    const contenedor = document.getElementById('estadisticas');
    
    contenedor.innerHTML = `
        <h3>Estadísticas</h3>
        <p>Total: ${stats.total}</p>
        <p>Completadas: ${stats.completadas}</p>
        <p>Pendientes: ${stats.pendientes}</p>
    `;
}

function filtrarYMostrar(estado) {
    const tareasFiltradas = filtrarTareas(estado);
    
    mostrarTareas(tareasFiltradas);
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarTareas();
    actualizarEstadisticas();
});
