const luces = document.querySelectorAll('.luz');

const arrayDeLuces = Array.from(luces);

const ordenSemaforo = [
    { clase: 'rojo', duracion: 4000 },
    { clase: 'verde', duracion: 3000 },   
    { clase: 'amarillo', duracion: 1000 } 
];

function cambiarLuz(indice) {
    
    arrayDeLuces.forEach(luz => {
        luz.classList.remove('activa');
    });

    const colorActual = ordenSemaforo[indice].clase;
    const luzActual = arrayDeLuces[indice];
    luzActual.classList.add('activa');

    const siguienteIndice = (indice + 1) % ordenSemaforo.length;

    setTimeout(() => {
        cambiarLuz(siguienteIndice);
    }, ordenSemaforo[indice].duracion);
}

cambiarLuz(0);
