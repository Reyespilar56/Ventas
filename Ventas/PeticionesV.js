
var buttonGenerales = document.getElementById('btnCalcularGenerales');
var buttonUsuario = document.getElementById('btnCalcularUsuario');
var mensaje = document.getElementById('mensaje');

buttonGenerales.addEventListener('click', function() {
    procesarFormulario('generales');
});

buttonUsuario.addEventListener('click', function() {
    procesarFormulario('usuario');
});

function procesarFormulario(filtroTipo) {
    console.log("botón funcional");

    var Zona = document.getElementById("Zona").value;
    var Usuario = document.getElementById("Usuario").value;
    var Telefono = document.getElementById("Telefono").value;
    var Cliente = document.getElementById("Cliente").value;
    var Fecha = document.getElementById("Fecha").value;

  
    if (Zona) {
        recibirDatos(Usuario, Zona, Telefono, Cliente, Fecha, "zona");
      } else if (Cliente && !filtroTipo) { // Verificar si filtroTipo no está establecido
        recibirDatos(Usuario, Zona, Telefono, Cliente, Fecha, "cliente");
        console.log("cliente", Cliente);
      } else {
        recibirDatos(Usuario, Zona, Telefono, Cliente, Fecha, filtroTipo);
      }
    }

function recibirDatos(Usuario, Zona, Telefono, Cliente, Fecha, filtroTipo) {
    console.log("Recibiendo datos");
    console.log("no me mates mirka",filtroTipo);
    axios.get('http://localhost:3000/Historial', {
        params: {
            Zona: Zona,
            Usuario: Usuario,
            Telefono: Telefono,
            Fecha: Fecha,
            Cliente: Cliente,
            filtroTipo: filtroTipo // Enviar filtroTipo al servidor
        },
        timeout: 500000 
    })
    .then(function(res) {
        console.log("Respuesta", res);
        if (res.status === 200) {
            localStorage.setItem("auth", Usuario, Zona, Telefono, Cliente, Fecha);
            mensaje.innerText = 'Datos recibidos: ' + JSON.stringify(res.data);
            // Redirigir a la página deseada
        }
    })
    .catch(function(err) {
        console.log(err);
        alert('Hubo un error al recibir los datos.');
    });
}