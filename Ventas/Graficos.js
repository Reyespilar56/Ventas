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

    // Manejar el evento de clic en el botón "Buscar Ventas"
    $('#formVentasUsuario').submit(function(event) {
        event.preventDefault();
        var tipoBusqueda = $('#selectTipoBusqueda').val();
        var valorBusqueda;

        switch(tipoBusqueda) {
            case 'zona':
                valorBusqueda = $('#inputZona').val();
                break;
            case 'usuario':
                valorBusqueda = $('#inputUsuario').val();
                break;
            case 'telefono':
                valorBusqueda = $('#inputTelefono').val();
                break;
            case 'cliente':
                valorBusqueda = $('#inputCliente').val();
                break;
            case 'fecha':
                valorBusqueda = $('#inputFecha').val();
                break;
            default:
                valorBusqueda = 'Telefono';
                break;
        }

        // Realizar la solicitud AJAX para obtener las ventas por tipo
        obtenerVentasPorTipo(tipoBusqueda, valorBusqueda);
    });

    // Manejar el evento de clic en el botón "Calcular Ventas Generales"
    $('#btnCalcularGenerales').click(function() {
        // Realizar la solicitud AJAX para obtener las ventas generales
        obtenerVentasGenerales();
    });

    // Función para obtener ventas por tipo mediante AJAX
    function obtenerVentasPorTipo(tipoBusqueda, valorBusqueda) {
        // Realizar una llamada AJAX para obtener los datos del servidor
        $.ajax({
            url: 'http://localhost:3000/Historial',  
            method: 'GET',  // Método a usa (GET, POST, etc.)
            data: { tipoBusqueda: tipoBusqueda, valorBusqueda: valorBusqueda },  // Datos a enviar al servidor
            success: function(data) {
                // Mostrar los resultados en el div de resultado
                mostrarResultadosVentas('<h3>Resultados de ventas:</h3>' + data);
            },
            error: function(error) {
                console.error('Error al obtener datos del servidor:', error);
            }
        });
    }

    // Función para obtener ventas generales mediante AJAX
    function obtenerVentasGenerales() {
        // Realizar una llamada AJAX para obtener los datos generales del servidor
        $.ajax({
            url: 'http://localhost:3000/Historial', 
            method: 'GET',  // Método HTTP que usarás (GET, POST, etc.)
            success: function(data) {
                // Mostrar los resultados en el div de resultado
                mostrarResultadosVentasGenerales('<h3>Ventas Generales:</h3>' + data);
            },
            error: function(error) {
                console.error('Error al obtener ventas generales del servidor:', error);
            }
        });
    }

    // Función para mostrar los resultados de ventas en el div de resultado
    function mostrarResultadosVentas(resultados) {
        $('#resultado').html(resultados);
    }

    function mostrarResultadosVentasGenerales(resultados) {
        $('#resultado').html(resultados);
    } // Función para mostrar los resultados de ventas generales en el div de resultado
   
});