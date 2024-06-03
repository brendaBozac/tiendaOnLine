// Capturar elementos del DOM
const productosDiv = document.getElementById('productos');
const carritoDiv = document.getElementById('carrito');
const totalDiv = document.getElementById('total');

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10, imagen: 'zapa1.jpg'},
    { id: 2, nombre: 'Producto 2', precio: 20, imagen: 'zapa2.jpg'},
    { id: 3, nombre: 'Producto 3', precio: 30, imagen: 'zapa6.jpg'},
    { id: 4, nombre: 'Producto 4', precio: 40, imagen: 'zapa4.jpg'},
    { id: 5, nombre: 'Producto 5', precio: 50, imagen: 'zapa5.jpg'},
    { id: 6, nombre: 'Producto 6', precio: 60, imagen: 'zapa3.jpg'}
];

let carrito = [];

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

function agregarAlCarrito(productId) {
  
    const producto = productos.find(p => p.id === productId);
    carrito.push(producto);
    mostrarCarrito();
}

function mostrarCarrito() {

  carritoDiv.innerHTML = ''; // Limpiar el contenido antes de agregar los productos
  carrito.forEach((item, index) => {
    const itemDiv = document.createElement('div');

    itemDiv.classList.add('item-carrito');
    itemDiv.innerHTML = `<span>${item.nombre} - $${item.precio}</span>
    <button onclick="eliminarDelCarrito(${index})">Eliminar</button> `; 

    carritoDiv.appendChild(itemDiv);
  });
  mostrarTotal();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}


function mostrarTotal() {
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  totalDiv.innerHTML = `Total: $${total}`;
  // Agregar clase CSS para el margen
  totalDiv.classList.add('total-margin');  
}

// Inicializar mostrando los productos
mostrarProductos();