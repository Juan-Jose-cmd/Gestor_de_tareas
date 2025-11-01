// 1. FUNCIONES SEPARADAS PARA CADA OPERACIÓN

function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        return "Error: No se puede dividir por cero";
    }
    return a / b;
}

// 2. PROGRAMA PRINCIPAL
function calculadora() {
    // Pedir números al usuario
    let num1 = parseFloat(prompt("Introduce el primer número:"));
    let num2 = parseFloat(prompt("Introduce el segundo número:"));
    
    // Verificar que sean números válidos
    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, introduce números válidos");
        return;
    }
    
    // Usar las funciones y mostrar resultados
    console.log(`Números: ${num1} y ${num2}`);
    console.log(`Suma: ${sumar(num1, num2)}`);
    console.log(`Resta: ${restar(num1, num2)}`);
    console.log(`Multiplicación: ${multiplicar(num1, num2)}`);
    console.log(`División: ${dividir(num1, num2)}`);
    
    // También se puede mostrar en alert
    alert(`
        Resultados:
        Suma: ${sumar(num1, num2)}
        Resta: ${restar(num1, num2)}
        Multiplicación: ${multiplicar(num1, num2)}
        División: ${dividir(num1, num2)}
    `);
}

// 3. EJECUTAR EL PROGRAMA
calculadora();