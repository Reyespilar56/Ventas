document.addEventListener('DOMContentLoaded', function () {
  // Obtener referencia a los botones y elementos del formulario
  var boton = document.getElementById('json_post');
  var logoutButton = document.getElementById('logoutButton');
  var foto = document.getElementById('foto');
  var mensaje = document.getElementById('mensaje');
  var inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const inputTelefono = document.getElementById('telefono');
  const inputReferencias = document.getElementById('referencias');
  const inputCoordenadas = document.getElementById('coordenadas');
  const inputTelefonocasa = document.getElementById('telefonocasa');
  var inputDomicilio = document.getElementById('Domicilio');
  const inputID = document.getElementById('ID');
  const inputpaquete = document.getElementById('paquete');
  const inputHora = document.getElementById('Hora');
  const inputMinuto = document.getElementById('Minuto');
  const inputFecha = document.getElementById('Fecha');
  const notas=document.getElementById("notas")
  const link1 = document.getElementById("urlDisplayINE");
  const link2 = document.getElementById("urlDisplayREVERSO");
  const link3 = document.getElementById("urlDisplayDOMICILIO");

  // Generar un ID aleatorio
  function generateRandomID() {
    const chars = '0123456789';
    let randomID = '';
    for (let i = 0; i < 10; i++) {
      randomID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomID;
  }

  // Enviar datos de formulario
  if (boton) {
    boton.addEventListener('click', function () {
      var randomid = generateRandomID();
      inputID.value = "cambaceo-" + localStorage.getItem("auth") + "-" + randomid; // Actualizar el valor del campo de ID en el formulario

      axios.post('https://ventas-cambaceo-back.vercel.app/instalacion', {
        data: {
          "token": "Smx2SVdkbUZIdjlCUlkxdFo1cUNMQT09",
          "Nombre": inputNombre.value,
          "email": inputEmail.value,
          "telefono": inputTelefono.value,
          "telefonocasa": inputTelefonocasa.value,
          "domicilio": inputDomicilio.value,
          "referencias": inputReferencias.value,
          "coordenadas": inputCoordenadas.value,
          "ID": inputID.value,
          "paquete": inputpaquete.value,
          "Fecha": inputFecha.value,
          "Hora": inputHora.value,
          "Minuto": inputMinuto.value,
          "URL_INE" : link1.href,
          "URL_REVERSO":link2.href,
          "URL_DOMICILIO":link3.href,
          "notas":notas

        }
      })
        .then(function (response) {
          console.log("respuesta", response);
          if (response.status === 200) {
            if (response.data && response.data.idcliente) {
              mensaje.innerHTML = 'Venta enviada: ' + response.data.idcliente;
            } else {
              mensaje.innerHTML = 'Venta enviada. ID de cliente generado.';
            }
          } else {
            console.error('Error:', response.status, response.data);
            mensaje.innerHTML = 'Error al enviar la venta.';
          }
        })
        .catch(function (error) {
          console.error('Error:', error);
          mensaje.innerHTML = 'Error de red o de conexión.';
        });
    });
  }

  // Verificar el estado de autenticación al cargar la página protegida
  window.onload = function () {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      // Redirigir a la página de inicio de sesión si no está autenticado
      window.location.href = 'http://127.0.0.1:5500/login/Login.html'; // Cambia a la URL de tu página de login
    }
  }

  /*if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('auth'); // Eliminar estado de autenticación
      window.location.href = 'http://127.0.0.1:5500/index/index.html'; // Redirigir a la página de login
    });
    
  }
*/
  /*if (foto) {
    foto.addEventListener('click', function () {
      window.location.href = 'http://127.0.0.1:5500/Calculadora/Calculadora.html'; // Redirigir a calculadora
    });
  }
    */

  
  const botonEncontrar = document.getElementById('encontrar');
  console.log("Botón encontrado:", botonEncontrar); // Verifica que el botón se encuentra
  if (botonEncontrar) { // Asegúrate de que el botón existe
    botonEncontrar.addEventListener('click', function () {
      // URL de destino
      window.open('https://www.google.com.mx/maps/preview', '_blank');
    });
  } else {
    console.error("No se encontró el botón con el ID 'encontrar'");
  }
});
