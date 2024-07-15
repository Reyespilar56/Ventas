// Obtener referencias a los elementos del formulario
const formularioVenta = document.getElementById('formulario-venta');
const selectProducto = document.getElementById('producto');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputTelefono = document.getElementById('telefono');
const inputCantidad = document.getElementById('cantidad');
const inputReferencias = document.getElementById('referencias');
const inputCoordenadas = document.getElementById('coordenadas');
const inputTelefonocasa = document.getElementById('telefonocasa');
const inputDomicilio = document.getElementById('domicilio');
const inputFecha = document.getElementById('Fecha');
const inputHora = document.getElementById('Hora');
const inputMinuto = document.getElementById('Minuto');
const inputphoto_data = document.getElementById("photo_data");


// Variables
let datosVenta;


// Evitar el envío predeterminado del formulario cuando se envía
formularioVenta.addEventListener('submit', async (event) => {
  event.preventDefault();


  // Crear un objeto para almacenar los datos del formulario
  datosVenta = {
    nombre: inputNombre.value,
    email: inputEmail.value,
    telefono: inputTelefono.value,
    producto: selectProducto.value,
    cantidad: inputCantidad.value,
    referencias: inputReferencias.value,
    coordenadas: inputCoordenadas.value,
    telefonocasa: inputTelefonocasa.value,
    domicilio: inputDomicilio.value,
    ID: inputID.value,
    paquete:inputpaquete.value,
    Fecha:inputFecha.value,
    Hora:inputHora.value,
    Minuto:inputMinuto.value,
    photo_data:inputphoto_data,
  };
// Llamar a una función para enviar los datos a través de Axios (ejemplo)

  // Suponiendo que tiene una función separada para abrir el modal en otro archivo (por ejemplo, modal.js)
  sendDataToServer(datosVenta);
});


// Función para mostrar coordenadas (se puede mover a un archivo separado si es necesario)
function displayCoordinates(latitude, longitude) {
  coordinatesInput.value = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`; // Formatear y mostrar coordenadas
  locationError.textContent = ''; // Borrar cualquier mensaje de error anterior
}

// (Opcional) Si se necesita la funcionalidad de ubicación en index.html:
const coordinatesInput = document.getElementById('inputCoordenadas'); // Reemplazar con el ID real
const locationError = document.getElementById('location-error'); // Reemplazar con el ID real

coordinatesInput.addEventListener('input', async () => {
  });

// Llamar a la función getDataFromAPI (suponiendo que está en un archivo separado)
getDataFromAPI();


