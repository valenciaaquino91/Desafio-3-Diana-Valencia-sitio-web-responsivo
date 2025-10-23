/**
 * ======================================================================
 * FUNCIONALIDAD DEL CARRITO DE COMPRAS (COMPARTIDA POR MATERIALES Y OBRAS)
 * ======================================================================
 */

// Array global para almacenar los items del carrito
let carrito = [];

// Función para añadir un producto o una obra al carrito
function agregarAlCarrito(nombre, precio) {
    // 1. Crear el objeto del nuevo item
    const newItem = {
        nombre: nombre,
        precio: precio
    };

    // 2. Añadir al array del carrito
    carrito.push(newItem);

    // 3. Actualizar la interfaz del carrito y el contador
    actualizarCarrito();

    // 4. Mostrar una alerta simple al usuario
    alert(`"${nombre}" añadido al carrito.`);
}

// Función para actualizar el contador y la lista de items en el modal
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    let total = 0;

    // Limpiar la lista actual en el modal
    listaCarrito.innerHTML = '';

    // Llenar la lista del modal y calcular el total
    carrito.forEach(item => {
        // Formatear el precio a 2 decimales para la visualización
        const precioFormateado = item.precio.toFixed(2);
        
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${item.nombre} - $${precioFormateado}`;
        listaCarrito.appendChild(listItem);

        // Sumar al total (asegura que item.precio es un número)
        total += parseFloat(item.precio);
    });

    // Actualizar el contador de items en el navbar
    contadorCarrito.textContent = carrito.length;

    // Actualizar el total a pagar en el modal, formateado a 2 decimales
    totalCarrito.textContent = total.toFixed(2);
}


// Event Listener: Añadir items al carrito al hacer clic en el botón
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones con la clase 'agregar-carrito'
    const botonesCarrito = document.querySelectorAll('.agregar-carrito');

    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Previene el comportamiento por defecto (navegar a '#')
            e.preventDefault(); 
            
            // Obtiene el panel padre (el producto u obra)
            const panel = boton.closest('.panel'); 
            
            // Extrae los datos usando los atributos data-* que definimos en el HTML
            const nombre = panel.getAttribute('data-nombre');
            // Convierte el precio a un número flotante
            const precio = parseFloat(panel.getAttribute('data-precio'));

            // Llama a la función principal para añadir el item
            agregarAlCarrito(nombre, precio);
        });
    });

    /**
     * ===============================================================
     * FUNCIONALIDAD DE FORTALEZA DE CLAVE
     * ===============================================================
     */

    const claveInput = document.getElementById('clave');
    const barraFortaleza = document.getElementById('password-strength-bar');
    const modalUsuario = document.getElementById('modal-usuario');

    if (claveInput && barraFortaleza) {
        // Evento que se dispara cada vez que el usuario escribe en el campo de clave
        claveInput.addEventListener('input', checkPasswordStrength);

        function checkPasswordStrength() {
            const password = claveInput.value;
            let strength = 0;
            let barColor = '#ccc'; // Color gris por defecto
            let barWidth = '0%';

            // Criterios de fortaleza:
            // 1. Longitud (mínimo 8)
            if (password.length >= 8) strength += 20;

            // 2. Incluye minúsculas y mayúsculas
            if (password.match(/(?=.*[a-z])(?=.*[A-Z])/)) strength += 20;

            // 3. Incluye números
            if (password.match(/(?=.*[0-9])/)) strength += 20;

            // 4. Incluye símbolos
            if (password.match(/(?=.*[!@#$%^&*])/)) strength += 20;
            
            // 5. Longitud superior (más de 12)
            if (password.length >= 12) strength += 20;

            // Limitar la fuerza máxima al 100%
            if (strength > 100) strength = 100;

            barWidth = `${strength}%`;

            // Definir el color según la fuerza
            if (strength < 40) {
                barColor = '#f44336'; // Rojo (Débil)
            } else if (strength < 80) {
                barColor = '#ffeb3b'; // Amarillo (Medio)
            } else {
                barColor = '#4CAF50'; // Verde (Fuerte)
            }

            // Aplicar los estilos a la barra
            barraFortaleza.style.width = barWidth;
            barraFortaleza.style.backgroundColor = barColor;
        }

        // Evento para reiniciar la barra cuando el modal se cierra
        if (modalUsuario) {
            $(modalUsuario).on('hidden.bs.modal', function () {
                // Reiniciar el valor del campo
                claveInput.value = '';
                // Reiniciar la barra de fortaleza visualmente
                barraFortaleza.style.width = '0%';
                barraFortaleza.style.backgroundColor = '#ccc';
            });
        }
    }
});