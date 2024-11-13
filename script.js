let inventario = [
  { producto: "Jeans Azul Oscuro", precio: 500, cantidad: 10 },
  { producto: "Jeans Clásicos", precio: 600, cantidad: 8 },
  { producto: "Jeans Ajustados", precio: 550, cantidad: 12 },
  { producto: "Camisa Blanca", precio: 200, cantidad: 20 },
  { producto: "Camisa de Rayas", precio: 220, cantidad: 18 },
  { producto: "Camisa Casual", precio: 250, cantidad: 15 },
  { producto: "Camisa de Cuadros", precio: 300, cantidad: 10 },
  { producto: "Zapatos Deportivos", precio: 800, cantidad: 10 },
  { producto: "Zapatos Formales", precio: 900, cantidad: 5 },
  { producto: "Zapatos Casual", precio: 850, cantidad: 8 }
];

let carrito = [];

function mostrarInventario(productos) {
  const productosDiv = document.getElementById("productos");
  productosDiv.innerHTML = "";
  productos.forEach((item, index) => {
    productosDiv.innerHTML += `
      <div class="producto">
        <h3>${item.producto}</h3>
        <p>Precio: $${item.precio}</p>
        <p>Disponible: <span id="cantidad-${index}">${item.cantidad}</span></p>
        <button onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
      </div>
    `;
  });
}

function mostrarCarrito() {
  const itemsCarrito = document.getElementById("items-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  itemsCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach((item, index) => {
    itemsCarrito.innerHTML += `
      <div class="carrito-item">
        <h3>${item.producto}</h3>
        <p>Precio: $${item.precio}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <button onclick="eliminarDelCarrito(${index})">Eliminar Uno</button>
      </div>
    `;
    total += item.precio * item.cantidad;
  });
  totalCarrito.innerText = total;
}

function actualizarInventario(index) {
  document.getElementById(`cantidad-${index}`).innerText = inventario[index].cantidad;
}

function agregarAlCarrito(index) {
  let producto = inventario[index];
  if (producto.cantidad > 0) {
    let itemCarrito = carrito.find(item => item.producto === producto.producto);
    if (itemCarrito) {
      itemCarrito.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    producto.cantidad -= 1;
    actualizarInventario(index);
  }
  mostrarCarrito();
}

function eliminarDelCarrito(index) {
  let producto = carrito[index];
  if (producto.cantidad > 1) {
    producto.cantidad -= 1;
  } else {
    carrito.splice(index, 1);
  }
  let productoInventario = inventario.find(item => item.producto === producto.producto);
  if (productoInventario) {
    productoInventario.cantidad += 1;
    actualizarInventario(inventario.indexOf(productoInventario));
  }
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito.forEach(item => {
    let productoInventario = inventario.find(producto => producto.producto === item.producto);
    if (productoInventario) {
      productoInventario.cantidad += item.cantidad;
    }
  });
  carrito = [];
  mostrarInventario(inventario);
  mostrarCarrito();
}

function filtrarProductos(busqueda) {
  return inventario.filter(item => item.producto.toLowerCase().includes(busqueda.toLowerCase()));
}

function buscarProducto() {
  const busqueda = document.getElementById("busqueda").value;
  const resultados = filtrarProductos(busqueda);
  mostrarInventario(resultados);
}

function filtrarPorPrecio() {
  const minPrecio = parseFloat(document.getElementById("min-precio").value) || 0;
  const maxPrecio = parseFloat(document.getElementById("max-precio").value) || Infinity;
  const resultados = inventario.filter(item => item.precio >= minPrecio && item.precio <= maxPrecio);
  mostrarInventario(resultados);
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarInventario(inventario);
});
