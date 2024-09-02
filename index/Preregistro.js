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
  const newSrc = document.getElementById("newSrc");
  const link1 = document.getElementById("link1");
  const link2 = document.getElementById("link2");
  const link3 = document.getElementById("link3");

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

      axios.post(' https://ventas-cambaceo-back.vercel.app/instalacion', {
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
        "URL_INE" : link1.src,
        "URL_REVERSO":link2.src,
        "URL_DOMICILIO":link3.src,

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

document.addEventListener('DOMContentLoaded', function () {
  // Obtener referencias a los elementos
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Botones de Ine, Reverso, y Domicilio
  const ineButton = document.getElementById('ine_button');
  const reversoButton = document.getElementById('reverso_button');
  const domicilioButton = document.getElementById('domicilio_button');

  // Función para abrir la cámara
  function openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
        video.style.display = 'block'; // Mostrar el video
        // video.play();
      })
      .catch(function (err) {
        console.error('Error al acceder a la cámara: ', err);
      });
  }

  /// Función para iniciar la cámara
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { exact: 'environment' } // 'environment' para la cámara trasera
      }
    });
    video.srcObject = stream;
    video.play();
  } catch (err) {
    console.error("Error al acceder a la cámara: ", err);
  }
}

// Función para capturar la foto
function capturePhoto() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  video.style.display = 'none'; // Ocultar el video después de capturar
  return canvas.toDataURL('image/jpeg'); // Devuelve la foto en formato Base64
}

// Llamar a la función para iniciar la cámara cuando la página cargue
startCamera();

  // Función para convertir la foto capturada en un Buffer y luego enviarla al servidor
  async function uploadPhoto(PhotoData, buttonType) {
    // Convierte la imagen Base64 a un Buffer
    const byteString = atob(PhotoData.split(',')[1]);
    const buffer = new Uint8Array(new ArrayBuffer(byteString.length));
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }

    // Crear un objeto Blob a partir del buffer
    const blob = new Blob([buffer], { type: 'image/jpeg' });

    // Crear un FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', blob, `${buttonType}.jpeg`);
    console.log('Sending request to the server...');

    const response = await axios.post('https://installations-calendar-back.vercel.app/drive/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Response received:', response);
    return response.data;
  }

  // Manejar clic en el botón Ine...
  ineButton.addEventListener('click', function () {
    openCamera(); // Abrir la cámara
    setTimeout(async () => {
      var inputNombre = document.getElementById('nombre');
      const PhotoData = capturePhoto(); // Capturar la foto
      const respuesta = await uploadPhoto(PhotoData, 'INE' + inputNombre.value); // Enviar la foto al servidor
      console.log("RESPUESTA INE", respuesta);

      if (respuesta.status == "ok") {
        const frameIne = document.getElementById("link1");
        const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`; // Definir newSrc aquí
        frameIne.setAttribute("src", newSrc);
      const urlDisplay = document.getElementById('urlDisplay'); // Asegúrate de tener un elemento con este ID en tu HTML
      // if (urlDisplay) {
         //   urlDisplay.textContent = newSrc; // Mostrar la URL en texto
       //}
        
      }
    }, 3000); // Esperar 3 segundos para permitir que la cámara se enfoque
  });

  // Manejar clic en el botón Reverso
  reversoButton.addEventListener('click', function () {
    openCamera(); // Abrir la cámara
    setTimeout(async () => {
      var inputNombre = document.getElementById('nombre');
      const PhotoData = capturePhoto(); // Capturar la foto
      const respuesta1 = await uploadPhoto(PhotoData, 'REVERSO INE' + inputNombre.value); // Enviar la foto al servidor
      console.log("RESPUESTA REVERSO INE", respuesta1);
      if (respuesta1.status == "ok") {
        const framereverso = document.getElementById("link2");
        framereverso.setAttribute("src", `https://drive.google.com/file/d/${respuesta1.id}/preview`);
      }

     
    }, 3000); // Esperar 3 segundos para permitir que la cámara se enfoque
  });

  // Manejar clic en el botón Domicilio
  domicilioButton.addEventListener('click', function () {
    openCamera(); // Abrir la cámara
    setTimeout(async () => {
      var inputNombre = document.getElementById('nombre');
      const PhotoData = capturePhoto(); // Capturar la foto
      const respuesta2 = await uploadPhoto(PhotoData, 'DOMICILIO' + inputNombre.value); // Enviar la foto al servidor
      console.log("RESPUESTA DOMICILIO", respuesta2);

      if (respuesta2.status == "ok") {
        const framedomicilio = document.getElementById("link3");
        framedomicilio.setAttribute("src", `https://drive.google.com/file/d/${respuesta2.id}/preview`);
      }
    }, 3000); // Esperar 3 segundos para permitir que la cámara se enfoque
  });
});
