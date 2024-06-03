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

// Mostrar productos en la tienda
function mostrarProductos() {
  /* productosDiv.innerHTML = ''; */ // Limpiar el contenido antes de agregar los productos
  productos.forEach( (producto) => {
    const productoDiv = document.createElement('div');
    /* aca creamos el sub div que contiene a cada producto en particular */
    productoDiv.classList.add('producto');

    productoDiv.innerHTML = 
    `<img src="imagenes/${producto.imagen}" class="fotozapa" alt="foto zapatilla">
    <span>${producto.nombre} - $${producto.precio}</span>

    <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>`;

    /* uso aqui producto. en singular porque estoy dentro del ciclo forEach, 
    es como mi i, o num */

    productosDiv.appendChild(productoDiv);
    /* le estoy indicando al programa que cada div de cada producto se va a ubicar
    dento del div productos -plural */
  });
}
/* entonces a modo de repaso, en esta funcion, iteramos por cada uno de los elementos
de la base de datos, cada objeto del array, cada producto, y para cada uno creamos
un espacio contenedor un div. le asignamos una clase, le decimos que va a contener
ese div,  que informacion de producto, (img nombre y precio como valores dinamicos)
y un boton para que cada producto pueda ser seleccionado
finalmente es necesario indicar donde van a ubicarse estructuralmente cada uno de esos 
div de cada producto
se van a ubicar como hijo (appendChild) del div productoDiv */


// Agregar producto al carrito
function agregarAlCarrito(productId) {
    /* atencion en esta linea de codigo 
    recibe del boton, desde el ciclo forEach an un valor de id que tiene q buscar esta funcion
    para identificar que producto agraga al carrito*/
    const producto = productos.find(p => p.id === productId);
    carrito.push(producto);
    /* una vez agregado, necesito mostrarlo */
    mostrarCarrito();
}

// Mostrar productos en el carrito
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

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
  
}



// Vaciar carrito de compras
function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

// Mostrar total de la compra
function mostrarTotal() {
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  totalDiv.innerHTML = `Total: $${total}`;
  // Agregar clase CSS para el margen
  totalDiv.classList.add('total-margin');  

}

// Inicializar mostrando los productos
mostrarProductos();