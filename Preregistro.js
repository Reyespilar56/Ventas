document.addEventListener('DOMContentLoaded', function() {
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
  //const inputphoto_data1 = document.getElementById('photo_data1');
  //const inputphoto_data2 = document.getElementById('photo_data2');
  //const inputphoto_data3 = document.getElementById('photo_data3');

  // Botones de Ine, Reverso, y Domicilio
  const ineButton = document.getElementById('ine_button');
  const reversoButton = document.getElementById('reverso_button');
  const domicilioButton = document.getElementById('domicilio_button');

  // Funciones que se ejecutarán al hacer clic en los botones
  if (ineButton) {
    ineButton.addEventListener('click', function() {
      alert('Fotografia lado frontral de la INE.');
    });
  } else {
    console.error('Botón Ine no encontrado');
  }

  if (reversoButton) {
    reversoButton.addEventListener('click', function() {
      alert('fotografia el reverso de la INE.');
    });
  } else {
    console.error('Botón Reverso no encontrado');
  }

  if (domicilioButton) {
    domicilioButton.addEventListener('click', function() {
      alert('Fotografia el Domicilio .');
    });
  } else {
    console.error('Botón Domicilio no encontrado');
  }

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
    boton.addEventListener('click', function() {
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
          "ID": inputID.value,
          "paquete": inputpaquete.value,
          "Fecha": inputFecha.value,
          "Hora": inputHora.value,
          "Minuto": inputMinuto.value,
         

        }
      })
      .then(function(response) {
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
      .catch(function(error) {
        console.error('Error:', error);
        mensaje.innerHTML = 'Error de red o de conexión.';
      });
    });
  }

  // Verificar el estado de autenticación al cargar la página protegida
  window.onload = function() {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      // Redirigir a la página de inicio de sesión si no está autenticado
      window.location.href = 'http://127.0.0.1:5500/login/Login.html'; // Cambia a la URL de tu página de login
    }
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('auth'); // Eliminar estado de autenticación
      window.location.href = 'http://127.0.0.1:5500/index/index.html'; // Redirigir a la página de login
    });
  }

  if (foto) {
    foto.addEventListener('click', function() {
      window.location.href = 'http://127.0.0.1:5500/Calculadora/Calculadora.html'; // Redirigir a calculadora
    });
  }

  const botonEncontrar = document.getElementById('encontrar');
  console.log("Botón encontrado:", botonEncontrar); // Verifica que el botón se encuentra
  if (botonEncontrar) { // Asegúrate de que el botón existe
    botonEncontrar.addEventListener('click', function() {
      // URL de destino
      window.open('https://www.google.com.mx/maps/preview', '_blank');
    });
  } else {
    console.error("No se encontró el botón con el ID 'encontrar'");
  }
});

document.addEventListener('DOMContentLoaded', function() {
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
      .then(function(stream) {
        video.srcObject = stream;
        video.style.display = 'block'; // Mostrar el video
        video.play();
      })
      .catch(function(err) {
        console.error('Error al acceder a la cámara: ', err);
      });
  }

  // Función para capturar la foto
  function capturePhoto() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    video.style.display = 'none'; // Ocultar el video después de capturar
    return canvas.toDataURL('image/jpeg'); // Devuelve la foto en formato Base64
  }

  // Función para convertir la foto capturada en un Buffer y luego enviarla al servidor
  function uploadPhoto(PhotoData, buttonType) {
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
    console.log("holaaaa",formData);
    formData.append('file', blob, `${buttonType}.jpeg`);

    
   // Enviar la foto al servidor usando fetch
fetch('/api/drive/upload', { // Cambia la URL a la ruta del proxy
  method: 'POST',
  body: formData,
  headers: {
    'Accept': 'application/json'
  }
})
.then(response => {
  console.log('Respuesta completa:', response);
  // ... resto del código sin cambios
})
.catch(error => {
  console.error('Error:', error);
});

    
  }

  // Manejar clic en el botón Ine
  ineButton.addEventListener('click', function() {
    openCamera(); // Abrir la cámara
    setTimeout(() => {
      const PhotoData = capturePhoto(); // Capturar la foto
      uploadPhoto(PhotoData, 'INE'); // Enviar la foto al servidor
    }, 4000); // Esperar 4 segundos para permitir que la cámara se enfoque
  });

  // Manejar clic en el botón Reverso
  reversoButton.addEventListener('click', function() {
    openCamera(); // Abrir la cámara
    setTimeout(() => {
      const PhotoData = capturePhoto(); // Capturar la foto
      uploadPhoto(PhotoData, 'REVERSO INE'); // Enviar la foto al servidor
    }, 4000); // Esperar 4 segundos para permitir que la cámara se enfoque
  });

  // Manejar clic en el botón Domicilio
  domicilioButton.addEventListener('click', function() {
    openCamera(); // Abrir la cámara
    setTimeout(() => {
      const PhotoData = capturePhoto(); // Capturar la foto
      uploadPhoto(PhotoData, 'DOMICILIO'); // Enviar la foto al servidor
    }, 4000); // Esperar 4 segundos para permitir que la cámara se enfoque
  });
});

