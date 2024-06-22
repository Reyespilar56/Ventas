// scrips.js

function validarFormulario() {
  // Obtener los valores de los campos de entrada
  const nombreUsuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  // Validación básica del formulario (se puede ampliar)
  if (nombreUsuario === '' || contrasena === '') {
    alert('Por favor, ingrese su nombre de usuario y contraseña.');
    return false;
  }

  // Simular un inicio de sesión exitoso (reemplazar con la lógica de autenticación real)
  alert('¡Inicio de sesión exitoso!');
  return true;
}

// Adjuntar un detector de eventos al evento de envío del formulario
const formularioInicioSesion = document.getElementById('validate.datos');
formularioInicioSesion.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar el envío predeterminado del formulario
  if (validarFormulario()) {
    // Realizar acciones adicionales después de la validación exitosa (opcional)
    // Por ahora, solo mostrar un mensaje de éxito
    alert('¡Inicio de sesión exitoso!');
  }
});
