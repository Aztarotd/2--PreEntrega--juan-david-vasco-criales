let inventario = [
    { producto: "Jeans", precio: 80, cantidad: 50 },
    { producto: "Camisa", precio: 20, cantidad: 70 },
    { producto: "Zapatos", precio: 100, cantidad: 30 }
  ];
  
  let carrito = [];
  
  function mostrarInventario() {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = "";
    inventario.forEach((item, index) => {
      productosDiv.innerHTML += `
        <div class="producto">
          <h3>${item.producto}</h3>
          <p>Precio: $${item.precio}</p>
          <p>Disponible: ${item.cantidad}</p>
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
    carrito.forEach(item => {
      itemsCarrito.innerHTML += `
        <div class="carrito-item">
          <h3>${item.producto}</h3>
          <p>Precio: $${item.precio}</p>
          <p>Cantidad: ${item.cantidad}</p>
        </div>
      `;
      total += item.precio * item.cantidad;
    });
    totalCarrito.innerText = total;
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
    }
    mostrarInventario();
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
    mostrarInventario();
    mostrarCarrito();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    mostrarInventario();
  });
  