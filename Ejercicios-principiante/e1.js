function e1(num1, num2) {
    let resultado = {
        suma: num1 + num2,
        resta: num1 - num2,
        multiplicacion: num1 * num2,
        divicion: num1 / num2
    };
    return resultado;
}

console.log(e1(2, 2));