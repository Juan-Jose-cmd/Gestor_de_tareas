function adivinaNumero() {
    const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    let adivinado = false;
    let intentos = 0;

    console.log("¡Adivina el número entre 1 y 10!");

    while (!adivinado) {
        let intento = parseInt(prompt("Introduce tu número:"));
        intentos++;

        if (isNaN(intento) || intento < 1 || intento > 10) {
            alert("Número inválido. Introduce entre 1 y 10");
            continue;
        }

        if (intento === numeroAleatorio) {
            adivinado = true;
            alert(`¡Correcto! Era ${numeroAleatorio}. Intentos: ${intentos}`);
        } else if (intento < numeroAleatorio) {
            alert("Más alto ⬆️");
        } else {
            alert("Más bajo ⬇️");
        }
    }
}

// Llamar a la función para empezar
adivinaNumero();