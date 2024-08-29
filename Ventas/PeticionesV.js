var buttonGenerales = document.getElementById('btnCalcularGenerales');
var buttonUsuario = document.getElementById('btnCalcularUsuario');
var selectFiltro = document.getElementById('selectTipoBusqueda');
var mensaje = document.getElementById('mensaje');
var resultTable = document.getElementById('resultTable');
var tableBody = resultTable.querySelector('tbody');

// Elementos de los campos de búsqueda
var divZona = document.getElementById('divZona');
var divUsuario = document.getElementById('divUsuario');
var divTelefono = document.getElementById('divTelefono');
var divCliente = document.getElementById('divCliente');
var divFecha = document.getElementById('divFecha');

// Lógica para mostrar/ocultar campos según el filtro seleccionado
selectFiltro.addEventListener('change', function() {
    divZona.style.display = 'none';
    divUsuario.style.display = 'none';
    divTelefono.style.display = 'none';
    divCliente.style.display = 'none';
    divFecha.style.display = 'none';

    var filtroTipo = selectFiltro.value;

    if (filtroTipo === 'zona') {
        divZona.style.display = 'block';
    } else if (filtroTipo === 'usuario') {
        divUsuario.style.display = 'block';
    } else if (filtroTipo === 'telefono') {
        divTelefono.style.display = 'block';
    } else if (filtroTipo === 'cliente') {
        divCliente.style.display = 'block';
    } else if (filtroTipo === 'fecha') {
        divFecha.style.display = 'block';
    }
});

// Inicializar campos visibles
selectFiltro.dispatchEvent(new Event('change'));

buttonGenerales.addEventListener('click', function() {
    procesarFormulario('generales');
});

buttonUsuario.addEventListener('click', function() {
    console.log('FILTRO', selectFiltro.value);
    procesarFormulario(selectFiltro.value);
});

function procesarFormulario(filtroTipo) {
    console.log("botón funcional");

    var Fecha = document.getElementById("Fecha");
    if (Fecha === null) {
        console.error("El elemento con ID 'Fecha' no existe en el DOM.");
        return;
    }

    var fechaValor = Fecha.value;
    var Valor = "";

    if (filtroTipo === 'zona') {
        Valor = document.getElementById("valorZona").value;
    } else if (filtroTipo === 'usuario') {
        Valor = document.getElementById("valorUsuario").value;
    } else if (filtroTipo === 'telefono') {
        Valor = document.getElementById("valorTelefono").value;
    } else if (filtroTipo === 'cliente') {
        Valor = document.getElementById("valorCliente").value;
    } else if (filtroTipo === 'fecha') {
        Valor = fechaValor;
    }

    recibirDatos(Valor, filtroTipo, fechaValor);
}
function recibirDatos(Valor, filtroTipo) {
    console.log("Recibiendo datos");
    axios.get('http://localhost:3000/Historial', {
        params: {
            valor: Valor,
            filtroTipo: filtroTipo // Enviar filtroTipo al servidor
        },
    })
    .then(function(res) {
        console.log("Respuesta", res);
        if (res.status === 200) {
            // Procesar datos y actualizar la tabla
            actualizarTabla(res.data);
        }
    })
    .catch(function(err) {
        console.error(err);
        alert('No se encontraron datos');
    });
}

function actualizarTabla(data) {
    // Mostrar la tabla
    resultTable.style.display = 'table';

    // Limpiar el cuerpo de la tabla
    tableBody.innerHTML = '';

    if (data.length > 0) {
        // Iterar sobre los datos y agregar filas a la tabla
        data.forEach(item => {
            const row = document.createElement('tr');

            const fields = [
                'usuario', 'cliente', 'direccion','ubicacion','fecha_instalacion',
                'telefono','movil', 'email', 'notas'
            ];

            fields.forEach(field => {
                const cell = document.createElement('td');
                cell.textContent = item[field] || ''; // Manejo de valores nulos
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
        mensaje.textContent = ''; // Limpiar el mensaje si hay datos
    } else {
        mensaje.textContent = 'No se encontraron datos.';
    }
}
var buttonGenerales = document.getElementById('btnCalcularGenerales');
var buttonUsuario = document.getElementById('btnCalcularUsuario');
var selectFiltro = document.getElementById('selectTipoBusqueda');
var mensaje = document.getElementById('mensaje');
var resultTable = document.getElementById('resultTable');
var tableBody = resultTable.querySelector('tbody');

// Elementos de los campos de búsqueda
var divZona = document.getElementById('divZona');
var divUsuario = document.getElementById('divUsuario');
var divTelefono = document.getElementById('divTelefono');
var divCliente = document.getElementById('divCliente');
var divFecha = document.getElementById('divFecha');

// Lógica para mostrar/ocultar campos según el filtro seleccionado
selectFiltro.addEventListener('change', function() {
    divZona.style.display = 'none';
    divUsuario.style.display = 'none';
    divTelefono.style.display = 'none';
    divCliente.style.display = 'none';
    divFecha.style.display = 'none';

    var filtroTipo = selectFiltro.value;

    if (filtroTipo === 'zona') {
        divZona.style.display = 'block';
    } else if (filtroTipo === 'usuario') {
        divUsuario.style.display = 'block';
    } else if (filtroTipo === 'telefono') {
        divTelefono.style.display = 'block';
    } else if (filtroTipo === 'cliente') {
        divCliente.style.display = 'block';
    } else if (filtroTipo === 'fecha') {
        divFecha.style.display = 'block';
    }
});

// Inicializar campos visibles
selectFiltro.dispatchEvent(new Event('change'));

buttonGenerales.addEventListener('click', function() {
    procesarFormulario('generales');
});

buttonUsuario.addEventListener('click', function() {
    console.log('FILTRO', selectFiltro.value);
    procesarFormulario(selectFiltro.value);
});

function procesarFormulario(filtroTipo) {
    console.log("botón funcional");

    var Fecha = document.getElementById("Fecha");
    var Valor = "";

    if (filtroTipo === 'zona') {
        Valor = document.getElementById("valorZona").value;
    } else if (filtroTipo === 'usuario') {
        Valor = document.getElementById("valorUsuario").value;
    } else if (filtroTipo === 'telefono') {
        Valor = document.getElementById("valorTelefono").value;
    } else if (filtroTipo === 'cliente') {
        Valor = document.getElementById("valorCliente").value;
    } else if (filtroTipo === 'fecha') {
        Valor = Fecha;
    }

    recibirDatos(Valor, filtroTipo, Fecha);
}

function recibirDatos(Valor, filtroTipo) {
    console.log("Recibiendo datos");
    axios.get('https://ventas-cambaceo-back.vercel.app/Historial', {
        params: {
            valor: Valor,
            filtroTipo: filtroTipo // Enviar filtroTipo al servidor
        },
    })
    .then(function(res) {
        console.log("Respuesta", res);
        if (res.status === 200) {
            // Procesar datos y actualizar la tabla
            actualizarTabla(res.data);
        }
    })
    .catch(function(err) {
        console.error(err);
        alert('No se encontraron datos');
    });
}

function actualizarTabla(data) {
    // Mostrar la tabla
    resultTable.style.display = 'table';

    // Limpiar el cuerpo de la tabla
    tableBody.innerHTML = '';

    if (data.length > 0) {
        // Iterar sobre los datos y agregar filas a la tabla
        data.forEach(item => {
            const row = document.createElement('tr');

            const fields = [
                'usuario', 'cliente', 'direccion','ubicacion','fecha_instalacion',
                'telefono','movil', 'email', 'notas'
            ];

            fields.forEach(field => {
                const cell = document.createElement('td');
                cell.textContent = item[field] || ''; // Manejo de valores nulos
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
        mensaje.textContent = ''; // Limpiar el mensaje si hay datos
    } else {
        mensaje.textContent = 'No se encontraron datos.';
    }
}
