var boton = document.getElementById('json_post');
var mensaje = document.getElementById('mensaje');
var inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputTelefono = document.getElementById('telefono');
const inputReferencias = document.getElementById('referencias');
const inputCoordenadas = document.getElementById('coordenadas');
const inputTelefonocasa = document.getElementById('telefonocasa');
var inputDomicilio = document.getElementById('Domicilio');
const inputID = document.getElementById('ID');
const inputpaquete =document.getElementById("paquete");
const inputHora =document.getElementById("Hora");
const inputMinuto =document.getElementById("Minuto");
const inputFecha =document.getElementById("Fecha");

boton.addEventListener('click', function() {

  // Generar un ID aleatorio
  function generateRandomID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomID = '';

    for (let i = 0; i < 10; i++) {
      randomID += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return randomID;
  }

  // Generar y mostrar el ID generado
  var randomid = generateRandomID();
  inputID.value = randomid; // Actualizar el valor del campo de ID en el formulario

  axios.post('http://localhost:3000/instalacion', {
    data: {
      "token": "Smx2SVdkbUZIdjlCUlkxdFo1cUNMQT09",
      "Nombre": inputNombre.value,
      "email": inputEmail.value,
      "telefono": inputTelefono.value,
      "telefonocasa": inputTelefonocasa.value,
      "domicilio": inputDomicilio.value,
      "referencias": inputReferencias.value,
      "coordenadas": inputCoordenadas.value,
      "ID":inputID.value,
      "paquete":inputpaquete.value,
      "Fecha":inputFecha.value,
      "Hora":inputHora.value,
      "Minuto":inputMinuto.value,
    }
  })
  .then(function(response) {
    console.log("respuesta", response);

    if (response.status === 200) {
      // Handle successful response
      if (response.data && response.data.idcliente) {
        mensaje.innerHTML = 'Venta enviada: ' + response.data.idcliente;
      } else {
        mensaje.innerHTML = 'Venta enviada. ID de cliente generado.';
      }
    } else {
      // Handle error response
      console.error('Error:', response.status, response.data);
      mensaje.innerHTML = 'Error al enviar la venta.';
    }
  })
  .catch(function(error) {
    // Handle network or other errors
    console.error('Error:', error);
    mensaje.innerHTML = 'Error de red o de conexión.';
  });
});
