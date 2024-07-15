// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  var bton = document.getElementById('bton');
  var mensaje = document.getElementById('mensaje');

  bton.addEventListener('click', function() {
    
    var Nombre = document.getElementById('Nombre').value;
    var correoElectronico = document.getElementById('correoElectronico').value;
    var Telefono = document.getElementById('Telefono').value;
    var TelefonoMovil = document.getElementById('TelefonoMovil').value;
    var Direccion = document.getElementById('Direccion').value;
    var Nombre_de_usuario =null;
    var contrasena = document.getElementById("contrasena").value;

    // Validación básica antes de enviar
    if (Nombre && correoElectronico && Telefono && TelefonoMovil && Direccion && Nombre_de_usuario && contrasena) {
      // Llama a la función para enviar la solicitud
      enviarSolicitud(Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, Nombre_de_usuario, contrasena);
    } else {
      mensaje.innerHTML = 'Por favor, complete todos los campos.';
    }
  });


  function enviarSolicitud(Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, Nombre_de_usuario, contrasena) {
   console.log("AQUIIIIIIIIII");
    axios.post('http://localhost:3000/usuario', {
data:{
      "Nombre": Nombre,
      "Telefono": Telefono,
      "TelefonoMovil": TelefonoMovil,
      "Direccion": Direccion,
      "contrasena": contrasena,
      "correoelEctronico": correoElectronico,
      "Nombre_de_usuario": Nombre_de_usuario
    }
    })
    .then(function(res) {
      console.log("respuesta", res);
      if (res.status === 200) {
        mensaje.innerHTML = 'El nuevo Usuario Agregado ' + res.data.idcliente;
      }
    })
    .catch(function(err) {
      console.log(err);
      mensaje.innerHTML = 'Hubo un error al registrar al Usuario.';
    });
  }
});
