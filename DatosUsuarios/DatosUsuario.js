// Obtiene el elemento del botón por su ID
var bton = document.getElementById('bton');

// Obtiene el elemento de mensaje por su ID (aunque no se utiliza en el código proporcionado)
var mensaje = document.getElementById('mensaje');

// Agrega un event listener al botón que escucha el evento 'click'
bton.addEventListener('click', function() {
  console.log("boton funcional"); // Muestra en la consola que el botón es funcional

  // Obtiene los valores de los campos del formulario por su ID
  var Nombre = document.getElementById('Nombre').value;
  var correoElectronico = document.getElementById('correoElectronico').value;
  var Telefono = document.getElementById('Telefono').value;
  var TelefonoMovil = document.getElementById('TelefonoMovil').value;
  var Direccion = document.getElementById('Direccion').value;
  var usuario = document.getElementById("usuario").value;
  var contrasena = document.getElementById('contrasena').value;
  var confirmarContrasena = document.getElementById('confirmarContrasena').value;

  // Genera un ID aleatorio para el usuario maximo de 150 
  var usuarioId = 'id-' + Math.floor(Math.random() * 150);

  // Muestra en la consola los datos obtenidos del formulario junto con el ID generado
  console.log("datos", usuarioId, Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena);

  // Valida el formulario y si es válido, envía la solicitud
  if (validarFormulario(Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena, confirmarContrasena)) {
    console.log("Validacion"); // Muestra en la consola que la validación fue exitosa
    enviarSolicitud(usuarioId, Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena);
  } 
});

// Función para validar los datos del formulario
function validarFormulario(Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena, confirmarContrasena) {
  // Expresión regular para validar el formato del correo electrónico
  var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Valida que el correo electrónico no esté vacío y tenga un formato válido
  if (!correoElectronico || !regexCorreo.test(correoElectronico)) {
    alert('Por favor, ingrese un correo electrónico válido.');
    return false;
  }
  
  // Valida que la contraseña no esté vacía
  if (!contrasena) {
    alert('Por favor, ingrese una contraseña válida.');
    return false;
  }

  // Valida que las contraseñas coincidan
  if (contrasena !== confirmarContrasena) {
    alert('Las contraseñas no coinciden.');
    return false;
  }

  // Si todas las validaciones pasan, retorna verdadero
  return true;
}

// Función para enviar la solicitud al servidor
function enviarSolicitud(usuarioId, Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena) {
  console.log("solicitud enviada"); // Muestra en la consola que la solicitud fue enviada
  // Realiza una petición POST al servidor con los datos del usuario
  axios.post('http://localhost:3000/usuario', {
    data: {
      "id": usuarioId,
      "Nombre": Nombre,
      "Telefono": Telefono,
      "TelefonoMovil": TelefonoMovil,
      "Direccion": Direccion,
      "contrasena": contrasena,
      "correoElectronico": correoElectronico,
      "usuario": usuario,
    }
  })
  .then(function(res) {
    console.log("respuesta", res); // Muestra la respuesta del servidor en la consola
    if (res.status === 200) {
      alert('Usuario agregado correctamente. ' + res.data); // Muestra un mensaje de éxito si la respuesta es exitosa
    }
  })
  .catch(function(err) {
    console.log(err); // Muestra el error en la consola si la petición falla
    alert('Hubo un error al registrar al Usuario.'); // Muestra un mensaje de error
  });
}
