
var buttonGenerales = document.getElementById('btnCalcularGenerales');
var buttonUsuario = document.getElementById('btnCalcularUsuario');
var selectFiltro = document.getElementById('selectTipoBusqueda');
var mensaje = document.getElementById('mensaje');

buttonGenerales.addEventListener('click', function() {
    procesarFormulario('generales');
});

buttonUsuario.addEventListener('click', function() {
    //procesarFormulario('usuario');
    console.log('FILTRO',selectFiltro.value);
    procesarFormulario(selectFiltro.value);
});

function procesarFormulario(filtroTipo) {
    console.log("botón funcional");

    var Zona = document.getElementById("Zona").value;
    var Usuario = document.getElementById("Usuario").value;
    var Telefono = document.getElementById("Telefono").value;
    var Cliente = document.getElementById("Cliente").value;
    var Fecha = document.getElementById("Fecha").value;
    const Valor = document.getElementById("valor").value;
    recibirDatos(Valor, filtroTipo);
}

function recibirDatos(Valor, filtroTipo) {
    console.log("Recibiendo datos");
    console.log("no me mates mirka",filtroTipo);
    axios.get('http://localhost:3000/Historial', {
        params: {
            valor: Valor,
            filtroTipo: filtroTipo // Enviar filtroTipo al servidor
        },
    })
    .then(function(res) {
        console.log("Respuesta", res);
        if (res.status === 200) {
            localStorage.setItem("auth", Valor);
            mensaje.innerText = 'Datos recibidos: ' + JSON.stringify(res.data);
            // Redirigir a la página deseada
        }
    })
    .catch(function(err) {
        //console.log(err);
        //alert('Hubo un error al recibir los datos.');
        alert('No se encontraron datos');
    });
}