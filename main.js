// Capturar elementos del DOM
const contenedor = document.getElementById('contenedor');
const productosDiv = document.getElementById('productos');
const carritoDiv = document.getElementById('carrito');
const totalDiv = document.getElementById('total');

let carrito = [];
let productos = [];
let total = 0;

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

  productos.forEach((producto) => {
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


function mostrarCarrito() {
  carritoDiv.innerHTML = '';
  carrito.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-carrito');

    
    // Mostrar subtotal para cada tipo de producto
    
    // itemDiv.classList.add('row');
    const subtotal = item.precio * item.cantidad;
    itemDiv.innerHTML = `
      <img src="imagenes/${item.imagen}" class="fotoCarrito carItem" alt="foto zapatilla">
      <p>${item.nombre}</p>
      <p>$${item.precio}</p>
      <p> x ${item.cantidad} unid.</p>
      
      <input type="number" class="carItem" min="1" value="${item.cantidad}" onchange="actualizarCantidad(${item.id}, this.value)">
      <p>Subtotal: $${subtotal}</p>
      <button class="carItem" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
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


      let carritoHTML = '';
        carrito.forEach(item => {
          carritoHTML += `
          <div class="item-compra">
            <p>${item.nombre} - $${item.precio} x ${item.cantidad} unidades = $${item.precio * item.cantidad}</p>
          </div>
          `;
        });

      contenedor.innerHTML =  `
      <div id="contenedor">
        <h2>Gran Elección!</h2>

        <h3>El monto Total por tu compra es de: $${total};
        <h3>Detalle de Facturación</h3>
        <p>${carritoHTML}</p>
        <h3>Completa los siguientes Datos</h3>

        <form id="purchase-form">
            <div class="form-group">
                <label for="firstName">Nombre:</label>
                <input type="text" id="firstName" name="firstName" value="Juan">
            </div>
            <div class="form-group">
                <label for="lastName">Apellido:</label>
                <input type="text" id="lastName" name="lastName" value="Pérez">
            </div>
            <div class="form-group">
                <label for="creditCardNumber">Número de Tarjeta de Crédito:</label>
                <input type="text" id="creditCardNumber" name="creditCardNumber" value="1234 5678 9012 3456">
            </div>

            <button id='botonPagar' type="button" class="btn-submit" onclick='confirmarPago()'>Pagar</button>
        </form>
      
      `;

      /* esto ayuda a que cuando refresca la pagina lleve el foco al 
      centro de la pagina y no al footer pr ejmp */
      const facturacion = document.getElementById('contenedor');
      if (facturacion) {
        facturacion.scrollIntoView({ block: 'center' });

    
      const pagar = document.getElementById('botonPagar');
      pagar.addEventListener('click', confirmarPago);
      
      }



    });

    


    contenedor.appendChild(botonComprar);

  }
  else if (carrito.length === 0 && document.getElementById('botonComprar')) {
    document.getElementById('botonComprar').remove();

  }
}


function confirmarPago() {

  sweetAlert();
  vaciarCarrito();
  localStorage.removeItem('carrito');
  

  

}

function sweetAlert() {
  
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 2000
  });


  setTimeout(()=> {
    window.location.href = window.location.href; 
  }, 2000

  );
}

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


// Mostrar el total definitivo sumando los subtotales de cada producto
function mostrarTotal() {
  total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  totalDiv.innerHTML = `Total: $${total}`;
  let navTotal = document.getElementById('montoTotal');
  navTotal.textContent = `Monto Total $${total}`;

  let cantidadNav = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  let contadorCantidad = document.getElementById('spanCantidad');
  contadorCantidad.textContent = `${cantidadNav}`;

  totalDiv.classList.add('total-margin');



}


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