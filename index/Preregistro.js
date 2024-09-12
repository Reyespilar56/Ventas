document.addEventListener('DOMContentLoaded', function () {
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
  const HoraFin = document.getElementById('HoraFin');
  const HoraInicio = document.getElementById('HoraInicio');
  const FechaFin = document.getElementById('FechaFin');
  const FechaInicio = document.getElementById('FechaInicio');
  const notas=document.getElementById("notas");
  const link1 = document.getElementById("urlDisplayINE");
  const link2 = document.getElementById("urlDisplayREVERSO");
  const link3 = document.getElementById("urlDisplayDOMICILIO");
  const inputcalle=document.getElementById("calle")
  const inputnumeroInt=document.getElementById("numeroInt")
  const inputnumeroExt=document.getElementById("numeroExt")
  const inputcp=document.getElementById("cp")
  const inputentreCalles=document.getElementById("entreCalles")
  
  const button = document.getElementById('confirmar');
 
const anticipoAmountInput = document.getElementById("anticipoAmountInput");


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
  if (confirmar) {
    confirmar.addEventListener('click', function () {
      var randomid = generateRandomID();
      inputID.value = "cambaceo-" + localStorage.getItem("auth") + "-" + randomid; // Actualizar el valor del campo de ID en el formulario
     
      axios.post(' http://localhost:3000/instalacion', {
        data: {
          "Cobro":`${anticipoAmountInput.value}`,
          "token": "Smx2SVdkbUZIdjlCUlkxdFo1cUNMQT09",
          "Nombre": inputNombre.value,
          "email": inputEmail.value,
          "telefono": inputTelefono.value,
          "telefonocasa": inputTelefonocasa.value,
       "domicilio": 
    `Domicilio: ${inputDomicilio.value}
    \nEntre Calles: ${inputentreCalles.value}
    \nC.P.: ${inputcp.value}
    \nNúmero Interior: ${inputnumeroInt.value}
    \nNúmero Exterior: ${inputnumeroExt.value}
    \nCalle: ${inputcalle.value}`
,
        "referencias": inputReferencias.value,
          "coordenadas": inputCoordenadas.value,
          "ID": inputID.value,
          "paquete": inputpaquete.value,
          "FechaFin": FechaFin.value,
          "FechaIni": FechaInicio.value,
          "HoraIni": HoraInicio.value,
          "HoraFin": HoraFin.value,
          "URL_INE" : link1.href,
          "URL_REVERSO":link2.href,
          "URL_DOMICILIO":link3.href,
          "notas":notas.value
          

        }
        
      })
  
        .then(function (response) {
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
        .catch(function (error) {
          console.error('Error:', error);
          mensaje.innerHTML = 'Error de red o de conexión.';
        });
    });
    
  }
 
  // Verificar el estado de autenticación al cargar la página protegida
  window.onload = function () {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      // Redirigir a la página de inicio de sesión si no está autenticado
      window.location.href = 'http://127.0.0.1:5500/login/Login.html'; // Cambia a la URL de tu página de login
    }
  }

  /*if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('auth'); // Eliminar estado de autenticación
      window.location.href = 'http://127.0.0.1:5500/index/index.html'; // Redirigir a la página de login
    });
    
  }
*/
  /*if (foto) {
    foto.addEventListener('click', function () {
      window.location.href = 'http://127.0.0.1:5500/Calculadora/Calculadora.html'; // Redirigir a calculadora
    });
  }
    */

  
  const botonEncontrar = document.getElementById('encontrar');
  console.log("Botón encontrado:", botonEncontrar); // Verifica que el botón se encuentra
  if (botonEncontrar) { // Asegúrate de que el botón existe
    botonEncontrar.addEventListener('click', function () {
      // URL de destino
      window.open('https://www.google.com.mx/maps/preview', '_blank');
    });
  } else {
    console.error("No se encontró el botón con el ID 'encontrar'");
  }
});

const anticipoSelect = document.getElementById("Anticipo");
const anticipoAmountDiv = document.getElementById("anticipoAmount");

anticipoSelect.addEventListener("change", () => {
    if (anticipoSelect.value === "SI") {
        anticipoAmountDiv.style.display = "block";
    } else {
        anticipoAmountDiv.style.display = "none";
    }
});

// FUNCION MODAL Y ENVIO DE DATOS
// Obtener referencias a los elementos
const botonEnviar = document.getElementById('json_post');
const modal = document.getElementById('myModal');
const cancelarBtn = document.querySelector('.modal-content .btn-danger');
const resumenLista = document.getElementById('resumenDatos');

// Función para mostrar el resumen de los datos en el modal
function mostrarResumen(datos) {
  resumenLista.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

  // Iterar sobre los datos y crear elementos de lista
  for (const propiedad in datos) {
    const li = document.createElement('li');
    console.log(propiedad, datos[propiedad]);
    
    li.textContent = `${datos[propiedad].nombre}: ${datos[propiedad].valor}`;
    resumenLista.appendChild(li);
  }
}

// Evento al hacer clic en el botón de enviar
botonEnviar.addEventListener('click', () => {
  // Obtener los datos del formulario
  const datos = {
     Nombre_Cliente: {valor:document.getElementById('nombre').value,nombre:"Nombre Cliente"}, 

     Email: {valor:document.getElementById('email').value,nombre:"Email"},

     Telefono :{valor: document.getElementById('telefono').value,nombre:"Telefono"},

     Referencias : {valor:document.getElementById('referencias').value,nombre:"Referencia"},

     Coordenadas : {valor:document.getElementById('coordenadas').value,nombre: "Coordenadas"},

     Telefonocasa : {valor:document.getElementById('telefonocasa').value,nombre:"Telefono Casa"},

     Domicilio : {valor:document.getElementById('Domicilio').value,nombre:"Domicilio"},

    paquete : {valor:document.getElementById('paquete').value,nombre:"paquete"},

    En_Horario_de:  {valor:document.getElementById('HoraInicio').value, nombre: "En horario de"},
    
     FechaFin:{valor:document.getElementById('HoraFin').value,nombre:"A "},

    Fecha_de : {valor:document.getElementById('FechaInicio').value,nombre:"Fecha de "},
    
    A : {valor:document.getElementById('FechaFin').value,nombre:"A "},

    notas :{valor:document.getElementById("notas").value,nombre:"Notas"},

    calle:{valor:document.getElementById("calle").value,nombre:"Calle"},

     numero_Int: {valor:document.getElementById("numeroInt").value,nombre:"Numero Int"},

    numero_Ext:{valor:document.getElementById("numeroExt").value,nombre:"Numero Ext"},

    Codigo_Postal:{valor:document.getElementById("cp").value,nombre:"Codigo Postal"},

     Entre_Calles: {valor:document.getElementById("entreCalles").value,nombre:"Entre Calles"},
  };

  // Mostrar el resumen en el modal
  mostrarResumen(datos);

  // Mostrar el modal
  modal.style.display = 'block';
});

// Evento al hacer clic en el botón de cancelar
cancelarBtn.addEventListener('click', () => {
  // Ocultar el modal
  modal.style.display = 'none';
});

