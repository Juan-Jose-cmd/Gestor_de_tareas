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





/*
async function addTask(descripcion, prioridad) {
    const id = crearId();
    const fecha = new Date().toISOString();
    
    // CREAR OBJETO TAREA
    let tareaNueva = new Tareas(id, descripcion, prioridad);
    
    //CÓDIGO PARA GUARDAR EN GOOGLE SHEETS
    try {
        await guardarTareaEnSheets(tareaNueva);
        tareas.push(tareaNueva); // Mantener en memoria también
        return tareaNueva;
    } catch (error) {
        console.error('Error guardando en Google Sheets:', error);
        throw error;
    }
}


/*
const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: 'TU_ID_DE_HOJA_DE_CÁLCULO', // Ej: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
    apiKey: 'TU_API_KEY_DE_GOOGLE',
    sheetName: 'Hoja 1' // Nombre de la pestaña
};
*/

/*
async function guardarTareaEnSheets(tarea) {
    // IMPLEMENTACIÓN CON GOOGLE SHEETS API
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/A:A:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_CONFIG.apiKey}`;
    
    const datos = [
        tarea.id,
        tarea.descripcion,
        tarea.prioridad,
        tarea.estado,
        tarea.fechaCreacion
    ];
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            values: [datos]
        })
    });
    
    if (!response.ok) {
        throw new Error('Error al guardar en Google Sheets');
    }
    
    return await response.json();
}
*/

/*
async function cargarTareasDesdeSheets() {
    //CARGAR TODAS LAS TAREAS DESDE GOOGLE SHEETS
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/A2:E?key=${GOOGLE_SHEETS_CONFIG.apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.values) {
        tareas = data.values.map(fila => {
            return new Tareas(
                parseInt(fila[0]), // id
                fila[1],          // descripcion
                fila[2],          // prioridad
                fila[3],          // estado
                fila[4]           // fechaCreacion
            );
        });
        // Actualizar el último ID
        ultimoId = tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) : 0;
    }
}
*/

/*
async function actualizarTareaEnSheets(tarea) {
    //ACTUALIZAR UNA TAREA EXISTENTE EN GOOGLE SHEETS
    // Primero necesitas encontrar la fila por ID
    const fila = await encontrarFilaPorId(tarea.id);
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/A${fila}:E${fila}?valueInputOption=RAW&key=${GOOGLE_SHEETS_CONFIG.apiKey}`;
    
    const datos = [
        tarea.id,
        tarea.descripcion,
        tarea.prioridad,
        tarea.estado,
        tarea.fechaCreacion
    ];
    
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            values: [datos]
        })
    });
    
    return await response.json();
}
*/

/*
async function eliminarTareaEnSheets(id) {
    //ELIMINAR TAREA DE GOOGLE SHEETS
    // Nota: Eliminar filas es más complejo, requiere Google Apps Script
    // Esta es una implementación simplificada
    const fila = await encontrarFilaPorId(id);
    
    // Marcar como eliminada en lugar de borrar físicamente
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/D${fila}:D${fila}?valueInputOption=RAW&key=${GOOGLE_SHEETS_CONFIG.apiKey}`;
    
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            values: [['eliminada']]
        })
    });
    
    return await response.json();
}
*/

// MODIFICACIONES A LAS FUNCIONES EXISTENTES (COMENTADAS)

/*
// En completarTarea, agregar después de cambiar el estado:
async function completarTarea(id) {
    const tareaEncontrada = tareas.find(tarea => tarea.id === id);
    
    if (tareaEncontrada) {
        tareaEncontrada.estado = 'completada';
        //ACTUALIZAR EN GOOGLE SHEETS
        await actualizarTareaEnSheets(tareaEncontrada);
    }
    
    return tareaEncontrada;
}
*/

/*
// En eliminarTarea, agregar:
async function eliminarTarea(id) {
    const indice = tareas.findIndex(tarea => tarea.id === id);

    if (indice !== -1) {
        tareas.splice(indice, 1);
        //ELIMINAR DE GOOGLE SHEETS
        await eliminarTareaEnSheets(id);
        return true;
    } else {
        return false;
    }
}
*/

/*
// En el evento DOMContentLoaded, cargar desde Google Sheets:
document.addEventListener('DOMContentLoaded', async function() {
    try {
        await cargarTareasDesdeSheets();
        mostrarTareas();
        actualizarEstadisticas();
    } catch (error) {
        console.error('Error cargando tareas:', error);
        // Mostrar tareas vacías o de ejemplo
        mostrarTareas();
    }
});*/
