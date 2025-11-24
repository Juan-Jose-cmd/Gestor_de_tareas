//--------------DOM presentacion-------------
//Traigo la seccion presnetacion
const seccionPresentacion = document.querySelector("#presentacion");

//Traigo todas las secciones que no sean presentacion
const secciones = document.querySelectorAll("section:not(#presentacion)");

//Traigo los tres botones: la constante botones es un array
const botones = document.querySelectorAll(".btnpres");

//--------------DOM Ingresar datos-----------
//Traigo los inputs
const inputs = document.querySelectorAll("#ingresarDatos input");

// Selecciono inputs de porcentaje
const porcentajes = [
    document.querySelector("#proporciones1"),
    document.querySelector("#proporciones2"),
    document.querySelector("#proporciones3"),
    document.querySelector("#proporciones4")
];

// Selecciono barras correspondientes
const barras = [
    document.querySelector(".barraDePorcentaje1"),
    document.querySelector(".barraDePorcentaje2"),
    document.querySelector(".barraDePorcentaje3"),
    document.querySelector(".barraDePorcentaje4")
];

// Inputs de nombre de material
const materiales = [
    document.querySelector("#erMaterial"),
    document.querySelector("#doMaterial"),
    document.querySelector("#cerMaterial"),
    document.querySelector("#toMaterial")
];

//Traigo el boton de guardar
const botonGuardar = document.querySelector("#guardar");

//-------------Funciones Presnetacion-----------------

//Recorro el array botones
botones.forEach((btn, i) => {

    //Le agrego un evento a cada elemento del array
    btn.addEventListener("click", () =>{

        //Recorro el array secciones le agrego la clase oculto a cada elemento del array
        secciones.forEach(sec => sec.classList.add("oculto"));

        //Cuando clique se asigna el indice del boton que corresponde con el indice de la seccion que quiero ver y se le remueve la clase oculto
        secciones[i].classList.remove("oculto");

        //Agrego la clase oculto a presentacion
        seccionPresentacion.classList.add("oculto");
    })
});

//-------------Funciones ingresar datos---------------

// Recorro los inputs 
inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        // Si este input tiene texto o número escrito
        if (input.value.trim() !== ""){
            // Habilitamos el siguiente input, si existe
            if (inputs[index + 1]) {
                inputs[index + 1].disabled = false;
            }
        } else {
            //Si se borra el contenido se bloquea el siguiente y los demás
            for (let i = index + 1; i < inputs.length; i++) {
                inputs[i].value = "";
                inputs[i].disabled = true;
            }
        }
    });

    input.addEventListener("keydown", (e) => {
        // Si presiona Enter
        if (e.key === "Enter") {
            e.preventDefault(); // Evita que se envíe el formulario

            // Buscar el siguiente input habilitado
            for (let j = index + 1; j < inputs.length; j++) {
                if (!inputs[j].disabled) {
                    inputs[j].focus(); // Enfoca el siguiente habilitado
                    break;
                }
            }
        }
    });
});

// Cada vez que cambie un porcentaje, ajusta la barra
porcentajes.forEach((input, i) => {
    input.addEventListener("input", () => {
        let valor = parseFloat(input.value);

        // Validar que no pase de 100
        if(valor > 100) valor = 100;
        if(valor < 0 || isNaN(valor)) valor = 0;

        barras[i].style.width = valor + "%"; // Ajusta el ancho
    });
});

// Evento para poner el nombre en la barra al escribir
materiales.forEach((input, i) => {
    input.addEventListener("input", () => {
        const nombre = input.value.trim();
        barras[i].textContent = nombre !== "" ? nombre : "";
    });
});

//Agrego un evento al boton de guardadr
botonGuardar.addEventListener("click", () => {
        const mezcla = {
            material1: {
                nombre: materiales[0].value,
                porcentaje: porcentajes[0].value
            },
            material2: {
                nombre: materiales[1].value,
                porcentaje: porcentajes[1].value
            },
            material3: {
                nombre: materiales[2].value,
                porcentaje: porcentajes[2].value
            },
            material4: {
                nombre: materiales[3].value,
                porcentaje: porcentajes[3].value
            }
    };

     // Traigo todas las mezclas previas o creamos una lista nueva
    const mezclasGuardadas = JSON.parse(localStorage.getItem("mezclas")) || [];

    // Agrego la nueva mezcla
    mezclasGuardadas.push(mezcla);

    // Guardo de nuevo en localStorage
    localStorage.setItem("mezclas", JSON.stringify(mezclasGuardadas));

    alert("✔ Mezcla guardada correctamente");

});


//Envio a una base de datos.
// fetch("https://mi-api-falsa.com/guardar", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(mezcla)
// })
// .then(res => console.log("📨 Enviando datos…", res))
// .catch(err => console.log("⚠ Error simulado:", err));

//-----------------Ensayos realizados---------------------

const listaEnsayos = document.querySelector("#listaEnsayos");
const btnEnsayos = botones[1]; // segundo botón "Ensayos realizados"

btnEnsayos.addEventListener("click", () => {

    listaEnsayos.innerHTML = ""; // Limpiar pantalla

    const mezclasGuardadas = JSON.parse(localStorage.getItem("mezclas")) || [];

    if (mezclasGuardadas.length === 0) {
        listaEnsayos.innerHTML = "<p>No hay ensayos registrados 🧪</p>";
        return;
    }

    mezclasGuardadas.forEach((mezcla, index) => {
        const card = document.createElement("div");
        card.classList.add("cardEnsayo");
        card.innerHTML = `
            <h3>Mezcla ${index + 1}</h3>
            <p><b>${mezcla.material1.nombre}</b>: ${mezcla.material1.porcentaje}%</p>
            <p><b>${mezcla.material2.nombre}</b>: ${mezcla.material2.porcentaje}%</p>
            <p><b>${mezcla.material3.nombre}</b>: ${mezcla.material3.porcentaje}%</p>
            <p><b>${mezcla.material4.nombre}</b>: ${mezcla.material4.porcentaje}%</p>
        `;
        listaEnsayos.appendChild(card);
    });
});


