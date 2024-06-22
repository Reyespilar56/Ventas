
const form= document.getElementById('registroForm'); // 'registroForm' se traduce a 'registroForm'

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar el envío predeterminado del formulario

  const nombre = document.getElementById('nombre').value;
  const correoElectronico = document.getElementById('correoElectronico').value;
  const contrasena = document.getElementById('contrasena').value;
  const confirmarContrasena = document.getElementById('confirmarContrasena').value;

  // Validación básica
  if (contrasena !== confirmarContrasena) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Crear objeto FormData (más eficiente)
  const datosFormulario = new FormData(form);

  // Enviar solicitud AJAX con FormData
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/registro.php'); // Reemplazar con la URL del script del servidor
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Manejar el registro exitoso
      alert('¡Registro exitoso!');
      // Redirigir o mostrar mensaje de éxito
      window.location.href = '/success.html'; // Redirigir a la página de éxito
    } else {
      // Manejar la respuesta de error
      alert('Error al registrarse. Inténtalo de nuevo.');
    }
  };
  xhr.send(formdata);
});
