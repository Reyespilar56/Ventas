var boton = document.getElementById('json_post');
var mensaje = document.getElementById('mensaje');
boton.addEventListener('click', function() {


  axios.post('https://private-anon-dd9a1a2f87-mikrowisp.apiary-mock.com/api/v1/NewUser', { // nuevo ususario api

    data: {// ejemplo 

        'token': 'Smx2SVdkbUZIdjlCUlkxdFo1cUNMQT09',
        'nombre': 'Carlos miguel perez',
        'cedula': '45464534',
        'correo': 'correo@correo.com',
        'telefono': '5124345',
        'movil': '989898989',
        'direccion_principal': 'Av del aire 333'

    }
  })
    .then(function(res) {
console.log("respues",res);
      if(res.status==200) {
        mensaje.innerHTML = 'El nuevo cliente agregado con  el Id' + res.data.idcliente;
      }
    })
    .catch(function(err) {
      console.log(err);
    });
});


