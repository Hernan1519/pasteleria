let productos = JSON.parse(localStorage.getItem("carrito")) || {}; // Recupera del storage
let total = calcularTotal();

// DOM
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const inputProductos = document.getElementById("input-productos");
const inputTotal = document.getElementById("input-total");
const formulario = document.getElementById("formulario-compra");

// FUNCIONES

function agregarAlCarrito(nombre, precio) {
  if (productos[nombre]) {
    productos[nombre].cantidad += 1;
  } else {
    productos[nombre] = { precio: precio, cantidad: 1 };
  }

  total += precio;
  guardarEnStorage();
  renderizarCarrito();
}

function renderizarCarrito() {
  if (!listaCarrito) return; // Si estamos en otra página, salimos

  listaCarrito.innerHTML = "";

  for (const nombre in productos) {
    const { precio, cantidad } = productos[nombre];
    const item = document.createElement("li");
    item.textContent = `${nombre} x${cantidad} - $${precio * cantidad}`;

    const btnEliminar = document.createElement("span");
    btnEliminar.textContent = " Eliminar";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.onclick = function () {
      productos[nombre].cantidad -= 1;
      total -= precio;

      if (productos[nombre].cantidad <= 0) {
        delete productos[nombre];
      }

      guardarEnStorage();
      renderizarCarrito();
    };

    item.appendChild(btnEliminar);
    listaCarrito.appendChild(item);
  }

  if (totalElemento) totalElemento.textContent = total;
}

function vaciarCarrito() {
  productos = {};
  total = 0;
  guardarEnStorage();
  renderizarCarrito();
}

function calcularTotal() {
  let suma = 0;
  for (const nombre in productos) {
    suma += productos[nombre].precio * productos[nombre].cantidad;
  }
  return suma;
}

function guardarEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(productos));
}


if (formulario) {
  formulario.addEventListener("submit", function (e) {
    let resumen = "";
    for (const nombre in productos) {
      resumen += `${nombre} x${productos[nombre].cantidad}\n`;
    }

    //alert("Resumen del pedido:\n" + resumen);

    inputProductos.value = resumen.trim();
    inputTotal.value = total;
  });
}


document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});

