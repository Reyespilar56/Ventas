$(document).ready(function() {
  // Ocultar todos los campos al inicio
  $('#divZona, #divUsuario, #divTelefono, #divCliente, #divFecha').hide();

  // Mostrar el campo correspondiente al seleccionar una opción en el select
  $('#selectTipoBusqueda').change(function() {
      var seleccion = $(this).val();

      // Ocultar todos los campos
      $('#divZona, #divUsuario, #divTelefono, #divCliente, #divFecha').hide();

      // Mostrar solo el campo seleccionado
      switch(seleccion) {
          case 'zona':
              $('#divZona').show();
              break;
          case 'usuario':
              $('#divUsuario').show();
              break;
          case 'telefono':
              $('#divTelefono').show();
              break;
          case 'cliente':
              $('#divCliente').show();
              break;
          case 'fecha':
              $('#divFecha').show();
              break;
          default:
              // En caso de algún valor no previsto, no hacer nada
              break;
      }
  });
});
