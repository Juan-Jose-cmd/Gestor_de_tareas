const productos = [
  { nombre: "Camiseta", precio: 25, oferta: true },
  { nombre: "Pantalón", precio: 40, oferta: false },
  { nombre: "Zapatillas", precio: 60, oferta: true },
  { nombre: "Gorra", precio: 15, oferta: true },
];

const total = productos
    .filter(item => item.oferta && item.precio < 50)
    .reduce((acc, item) => acc + item.precio, 0);

console.log("Total a pagar:", total);