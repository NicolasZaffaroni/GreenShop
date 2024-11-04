
let $carrito = [];
let $carritoContainer = document.getElementById("carritoContainer");
let $toggleCarritoBtn = document.getElementById("toggleCarrito");
let $carritoItemsContainer = document.querySelector("#carritoItems");

function greenShop() {
    CarritoDisplay();
    buyPlants();
    pay();
}

function CarritoDisplay() {
    if ($carrito.length > 0) { // Comprobar si hay elementos en el carrito
        $carritoContainer.style.display = "block"; // Muestra el contenedor del carrito
        console.log("Mostrando el carrito con artículos");
        mostrarCarrito(); // Muestra los artículos en el carrito si hay
    } else {
        alert("El carrito está vacío.");
        $carritoContainer.style.display = "none"; // Oculta el carrito si está vacío
    }
}


function buyPlants() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            let findProductId = button.closest(".product-card").getAttribute("id");

            addToCart(findProductId, products);
        });
    });
}

function mostrarCarrito() {
    $carritoItemsContainer.innerHTML = ""; // Limpiar el contenedor de ítems
    let total = 0; // Variable para el precio total a pagar

    // Mostrar cada producto en el carrito
    $carrito.forEach((product) => {
        let $div = document.createElement("div");
        $div.classList.add("carritoItems");

        let $imagen = document.createElement("img");
        $imagen.src = product.imagen;
        $imagen.alt = product.nombre;
        $imagen.style.width = "50px";
        $imagen.style.height = "auto";

        let $descripcion = document.createElement("div");
        $descripcion.innerHTML = `
            <div class="product-name">${product.nombre}</div>
            <div class="product-price">Precio: $${product.precio}</div>
            <div class="product-stock">Disponibles: <span>${product.stock}</span></div>
            <div class="product-cantidad">Cantidad en carrito: <span>${product.cantidad}</span></div>
        `;

        let $btnRemove = document.createElement('button');
        $btnRemove.textContent = "Eliminar";
        $btnRemove.classList.add('remove-item');

        let $btnStockMore = document.createElement('button');
        $btnStockMore.textContent = '+'; 
        $btnStockMore.classList.add('remove-item');

        let $btnStockLess = document.createElement('button');
        $btnStockLess.textContent = '-'; 
        $btnStockLess.classList.add('remove-item');

        $btnStockMore.addEventListener('click', () => {
            adjustQuantity(product.id, 'increase');
        });

        $btnStockLess.addEventListener('click', () => {
            adjustQuantity(product.id, 'decrease');
        });

        $btnRemove.addEventListener('click', () => {
            removeItem(product.id);
        });

        total += product.precio * product.cantidad; // Sumar al total de todos los productos en el carrito 

        $div.appendChild($imagen);
        $div.appendChild($descripcion);
        $div.appendChild($btnRemove);
        $div.appendChild($btnStockMore);
        $div.appendChild($btnStockLess);
        $carritoItemsContainer.appendChild($div);
    });

    // Crear y mostrar el total en la parte inferior del carrito
    let $totalDisplay = document.createElement("div");
    $totalDisplay.classList.add("carrito-total");
    $totalDisplay.innerHTML = `<strong>Total a pagar: $${total}</strong>`;
    $carritoItemsContainer.appendChild($totalDisplay);

    // Crear el botón de "Limpiar carrito" y añadirlo debajo del total
    let $btnCleancarrito = document.createElement('button');
    $btnCleancarrito.textContent = 'Limpiar carrito';
    $btnCleancarrito.classList.add('remove-item');
    $btnCleancarrito.addEventListener('click', () => {
        vaciarCarrito();
    });
    $carritoItemsContainer.appendChild($btnCleancarrito);
}



function vaciarCarrito() {
    $carrito = []; // Vacía el carrito
    mostrarCarrito(); // Actualiza la visualización del carrito

    if ($carrito.length === 0) { 
        // Si el carrito está vacío, oculta el contenedor
        $carritoContainer.style.display = "none"; 
    } else {
        // Si el carrito tiene artículos, asegúrate de que esté visible
        $carritoContainer.style.display = "block";
    } 
}

function removeItem(idBuscado) {
    $carrito = $carrito.filter(plant => plant.id !== idBuscado);
    mostrarCarrito();
    console.log("Carrito actualizado", $carrito);
}


function adjustQuantity(productId, action) {
    let carritoItem = $carrito.find(item => item.id === productId);

    if (carritoItem) {
        if (action === 'increase' && carritoItem.stock > 0) {
            carritoItem.cantidad += 1;
            carritoItem.stock -= 1;
        } else if (action === 'decrease' && carritoItem.cantidad > 1) {
            carritoItem.cantidad -= 1;
            carritoItem.stock += 1;
        } else {
            alert("No se puede realizar esta acción.");
        }
        mostrarCarrito(); // Actualizar la visualización del carrito
    }
}

function pay() {
    let $payButton = document.querySelector("#checkout");

    if ($payButton) {
        $payButton.addEventListener("click", () => {
            if ($carrito.length > 0) {
                alert("Gracias por comprar en GreenShop");
                $carrito = [];
                mostrarCarrito();
                setInterval("location.reload()", 500);
            } else {
                alert("El carrito está vacío.");
            }
        });
    }
}

function addToCart(productId, products) {
    let product = products.find(item => item.id === productId);

    if (product) {
        let carritoItem = $carrito.find(item => item.id === productId);
        if (carritoItem) {
            if (carritoItem.stock > 0) {
                carritoItem.cantidad += 1;
                carritoItem.stock -= 1;
            } else {
                alert("Este artículo no posee más stock.");
            }
        } else {
            $carrito.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                stock: product.stock - 1,
                cantidad: 1
            });
        }
        mostrarCarrito();
    } else {
        console.error("Producto no encontrado.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    greenShop();
});
