var boton = document.getElementById('json_post');
var logoutButton= document.getElementById('logoutButton');
var foto= document.getElementById('foto');
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
const inputphoto_data = document.getElementById("photo_data");

boton.addEventListener('click', function() {



  // Generar un ID aleatorio
  function generateRandomID() {
    const chars = '0123456789';
    let randomID = '';

    for (let i = 0; i < 10; i++) {
      randomID += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return randomID;
  }

  // Generar y mostrar el ID generado
  var randomid = generateRandomID();
  inputID.value = "cambaceo-" + localStorage.getItem("auth") + "-" + randomid; // Actualizar el valor del campo de ID en el formulario



  
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
      "photo_data":inputphoto_data.value,
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
      mensaje.innerHTML = 'Error al enviar la venta.';g
    }
  })
  .catch(function(error) {
    // Handle network or other errors
    console.error('Error:', error);
    mensaje.innerHTML = 'Error de red o de conexión.';
  });
});
    // Verificar el estado de autenticación al cargar la página protegida
    window.onload = function() {
      const auth = localStorage.getItem('auth');
      if (!auth) {
        // Redirigir a la página de inicio de sesión si no está autenticado
        window.location.href = 'http://127.0.0.1:5500/login/Login.html'; // Cambia a la URL de tu página de login
      }
      
    }

    document.addEventListener('DOMContentLoaded', function() {
      const logoutButton = document.getElementById('logoutButton');
      logoutButton.addEventListener('click', function() {
        localStorage.removeItem('auth'); // Eliminar estado de autenticación
        window.location.href = ' http://127.0.0.1:5500/index/index.html'; // Redirigir a la página de login
      });
    });


  document.addEventListener('DOMContentLoaded', function() {
    const foto = document.getElementById('foto');
    foto.addEventListener('click', function() {
      window.location.href = ' http://127.0.0.1:5500/Calculadora/Calculadora.html'; // Redirigir a calculadora
    })
    });

  


