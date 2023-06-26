var componentItems;
var component;
var componentContainer;
var mensajeInicialCarrito;
var name;
var price;
var image;
var trashButtons;
var trashButton;
var total;
var sumatorio = 0;

function restablecerMensajeInicialCarrito() {
    componentContainer.style.display = "flex";
    componentContainer.style.padding = "100px 10px 100px 10px";
    var elementMensajeInicialCarrito = document.createElement("p");
    elementMensajeInicialCarrito.textContent = "Arrastre aquí los artículos que quiere añadir";
    elementMensajeInicialCarrito.id = 'mensajeInicial';
    componentContainer.appendChild(elementMensajeInicialCarrito);
}

function domCargado() {
    // Captura de todos los Elements necesarios
    componentItems = document.getElementsByClassName("component");
    componentContainer = document.getElementById("container");
    total = document.getElementById("total");

    // Eventos del D&D (Drag & Drop)
    for (let item of componentItems) {
        item.addEventListener('dragstart', (event) => {
            event.dataTransfer.effectAllowed = "copy";
            component = event.target;
            name = component.querySelector(".name").textContent;
            price = component.querySelector(".price").textContent;
            image = component.querySelector("img").src;
        });
    }

    componentContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    });

    componentContainer.addEventListener('drop', (event) => {
        mensajeInicialCarrito = componentContainer.querySelector("#mensajeInicial");
        if (mensajeInicialCarrito) {
            componentContainer.removeChild(mensajeInicialCarrito);
            componentContainer.style.padding = "10px";
            componentContainer.style.display = "block";
        }
        componentContainer.innerHTML += `
            <div class="componentShoppingCart">
                <img src="${image}" draggable="false" alt="">
                <p class="name">${name}</p>
                <p class="price">${price}</p>
                <i class="fa-solid fa-trash"></i>
            </div>
            `;
        sumatorio += parseFloat(price.replace("€", ""));
        total.textContent = `Total: ${sumatorio.toFixed(2)}€`;
        
    });

    componentContainer.addEventListener('click', (event) => {
        mensajeInicialCarrito = componentContainer.querySelector("#mensajeInicial");
        trashButtons = document.getElementsByClassName("fa-solid fa-trash");
        if (event.target.classList.contains("fa-trash")) {
            var componentShoppingCart = event.target.closest(".componentShoppingCart");
            sumatorio -= parseFloat(componentShoppingCart.querySelector('.price').textContent.replace("€", ""));
            parentNode = componentShoppingCart.parentNode;
            componentShoppingCart.parentNode.removeChild(componentShoppingCart);
            total.textContent = `Total: ${sumatorio.toFixed(2)}€`;
        }
        if (componentContainer.querySelectorAll('.componentShoppingCart').length === 0 && !mensajeInicialCarrito) {
            restablecerMensajeInicialCarrito();
        }
    });
}

document.addEventListener('DOMContentLoaded', domCargado);