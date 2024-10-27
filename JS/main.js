const $carrito = []; // Array para guardar los productos del carrito
const $carritoContainer = document.getElementById("carritoContainer");
const $toggleCarritoBtn = document.getElementById("toggleCarrito");



//GreenShop Conjunto de funciones
function greenShop(){
    onShopCart()
    buy()
    mostrarCarrito()
}


function onShopCart(){
    $toggleCarritoBtn.addEventListener("click", () => {
        if ($carritoContainer.length === 0){ //Falla en cuanto entro sale carrito 
            this.classList.add('#carritoContainer') // Oculta el carrito
        } else {
            $carritoContainer.style.display = "none"; 
        }
    })
}
;
function buy(){
// Agregar eventos a los botones de agregar al carrito
    document.querySelectorAll(".add-to-cart").forEach((button) => { 
        button.addEventListener("click", () => {
            let $productCard = button.parentElement; // Obtener el contenedor del producto//Tambien se puede usar Closest--
            let $productoId = $productCard.getAttribute("id");
            let $productoNombre = $productCard.querySelector("h2").textContent;
            let $productoPrecio = $productCard.querySelector(".price").textContent;
            let $productoImagen = $productCard.querySelector("img").src;

            // Agregar producto al carrito
            $carrito.push({ id: $productoId, nombre: $productoNombre, precio: $productoPrecio, imagen: $productoImagen });

            // Actualizar la visualización del carrito
            mostrarCarrito();
            console.log($carrito); // Comprobar carrito
            console.log($carritoContainer.classList);//Ver Clase del carrito VALUE IMPORTANTE!
        });
});
}

function mostrarCarrito() {
    let $carritoItemsContainer = document.querySelector("#carritoItems");
    $carritoItemsContainer.innerHTML = ""; 
// Agregar productos al carrito 
$carrito.forEach((product) => {
    let $div = document.createElement("div");
    $div.classList.add("cart-item"); 

    let $imagen = document.createElement("img");
    $imagen.src = product.imagen; 
    $imagen.alt = product.nombre;
    $imagen.style.width = "80px"; //OJO MALA PRACTICA
    $imagen.style.height = "auto";//!!

    let $descripcion = document.createElement("div");
    $descripcion.innerHTML = `<strong>${product.nombre}</strong><br>${product.precio}`;

    $div.appendChild($imagen); 
    $div.appendChild($descripcion);
    $carritoItemsContainer.appendChild($div); 
    console.log("soy el carrito", $carrito); // Mostrar mi carrito 
});
    $carritoContainer.style.display = "block";
}


    // Mostrar el contenedor del carrito
    console.log($carrito);



    greenShop()







//Anotaciones IMPORTANTES.
//Preguntar por que me falla cambio de clases
//MALA PRACTICA USAR EL STYLE EN JS PERO SI NO, NO PUEDO CORREGIR PAGINA
//Pregunta si se puede usar LocalStorage para crear "Falsa Base de datos"
//Crear "Falsa base de datos, en un archivo y usar promesas para traer y visualizar seria mas facil de esa manera"
//Mejorar estilos.