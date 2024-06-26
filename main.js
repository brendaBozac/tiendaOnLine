// Capturar elementos del DOM
const contenedor = document.getElementById('contenedor');
const productosDiv = document.getElementById('productos');
const carritoDiv = document.getElementById('carrito');
const totalDiv = document.getElementById('total');

/* const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10, imagen: 'zapa1.jpg'},
    { id: 2, nombre: 'Producto 2', precio: 20, imagen: 'zapa2.jpg'},
    { id: 3, nombre: 'Producto 3', precio: 30, imagen: 'zapa6.jpg'},
    { id: 4, nombre: 'Producto 4', precio: 40, imagen: 'zapa4.jpg'},
    { id: 5, nombre: 'Producto 5', precio: 50, imagen: 'zapa5.jpg'},
    { id: 6, nombre: 'Producto 6', precio: 60, imagen: 'zapa3.jpg'}
]; */

let carrito = [];
let productos = [];

/* aqui lo que hago es vincular estas funciones js al archivo json */

async function cargarProductos() {
  try {
    const respuesta = await fetch('productos.json');
    if (!respuesta.ok) {
      throw new Error('No pudimos conectar con el servidor');
    }
    const data = await respuesta.json();

    productos = data;
    mostrarProductos();


  } catch (error) {
    console.error('algo salio mal', error);

  }
}

function mostrarProductos() {
 
  productos.forEach( (producto) => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    productoDiv.innerHTML = 
    `<img src="imagenes/${producto.imagen}" class="fotozapa" alt="foto zapatilla">
    <span>${producto.nombre} - $${producto.precio}</span>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>`;

    productosDiv.appendChild(productoDiv);
    
  });
}

/* 
function agregarAlCarrito(productId) {
  
    const producto = productos.find(p => p.id === productId);
    carrito.push(producto); */
    
    /* guardar carrito en localStorage */
   /*  guardarCarritoEnLocalStorage();

    mostrarCarrito();
}
 */

function agregarAlCarrito(productId) {
  const producto = productos.find(p => p.id === productId);
  const productoEnCarrito = carrito.find(p => p.id === productId);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 }); //con ...producto, habilita a crear para el
    //producto todas las propiedades que quiera ? , en este caso creamos cantidad con el valor 1
  }

  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

/* 
function mostrarCarrito() {

  carritoDiv.innerHTML = '';
  carrito.forEach((item, index) => {
    const itemDiv = document.createElement('div');

    itemDiv.classList.add('item-carrito');
    itemDiv.innerHTML = `<span>${item.nombre} - $${item.precio}</span>
    <button onclick="eliminarDelCarrito(${index})">Eliminar</button> `; 

    carritoDiv.appendChild(itemDiv);
  });
  mostrarTotal();
  mostrarBoton();
}
 */

function mostrarCarrito() {
  carritoDiv.innerHTML = ''; 
  carrito.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-carrito');
    // Mostrar subtotal para cada tipo de producto
    const subtotal = item.precio * item.cantidad;
    itemDiv.innerHTML = `
      <img src="imagenes/${item.imagen}" class="fotoCarrito" alt="foto zapatilla">
      <p>${item.nombre}</p>
      <p>$${item.precio}</p>
      <p> x ${item.cantidad} unid.</p>
      
      <input type="number" min="1" value="${item.cantidad}" onchange="actualizarCantidad(${item.id}, this.value)">
      <p>Subtotal: $${subtotal}</p>
      <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
    `;

    carritoDiv.appendChild(itemDiv);
  });

  mostrarTotal();
  mostrarBoton();
}



function mostrarBoton() {
  if (carrito.length > 0 && !document.getElementById('botonComprar')) {
  const botonComprar = document.createElement('button');
  botonComprar.textContent = 'Comprar';
  botonComprar.id = 'botonComprar';
  botonComprar.className = 'botonComprar';


  botonComprar.addEventListener('click', () => {
    alert('tu pedido esta en camino!!!');
    vaciarCarrito();
    localStorage.removeItem('carrito');
  });

  

  contenedor.appendChild(botonComprar);

  }
  else if (carrito.length === 0 && document.getElementById('botonComprar')) {
    document.getElementById('botonComprar').remove();
    
}
}

/* 
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
  guardarCarritoEnLocalStorage();

} */

function eliminarDelCarrito(productId) {
  carrito = carrito.filter(item => item.id !== productId);
  mostrarCarrito();
  guardarCarritoEnLocalStorage();
}

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
  localStorage.removeItem('carrito');
}

/* 
function mostrarTotal() {
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  totalDiv.innerHTML = `Total: $${total}`; */
  // Agregar clase CSS para el margen
 /*  totalDiv.classList.add('total-margin');  
} */


/* 
 function mostrarTotal() {
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  totalDiv.innerHTML = `Total: $${total}`;
  // Agregar clase CSS para el margen
  totalDiv.classList.add('total-margin');
} */


  // Mostrar el total definitivo sumando los subtotales de cada producto
function mostrarTotal() {
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  totalDiv.innerHTML = `Total: $${total}`;
  totalDiv.classList.add('total-margin');
}


/* 
function actualizarCantidad(productId, cantidad) {
  const producto = carrito.find(p => p.id === productId);
  if (producto) {
    producto.cantidad = parseInt(cantidad);
    if (producto.cantidad <= 0) {
      eliminarDelCarrito(productId);
    } else {
      guardarCarritoEnLocalStorage();
      mostrarCarrito();
    }
  }
}
 */

function actualizarCantidad(productId, cantidad) {
  const producto = carrito.find(p => p.id === productId);
  if (producto) {
    producto.cantidad = parseInt(cantidad);
    if (producto.cantidad <= 0) {
      eliminarDelCarrito(productId);
    } else {
      guardarCarritoEnLocalStorage();
      mostrarCarrito();
    }
  }
}


function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    mostrarCarrito();
  }
}




// Inicializar mostrando los productos
cargarProductos();
cargarCarritoDeLocalStorage();