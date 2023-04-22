var socket = io();
var list = document.querySelector('#not');
//Elementos de HTML
let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let usuarios = document.getElementById('usuarios');

let salida = document.getElementById('salida');
let notificaciones = document.getElementById('notificaciones');
let boton = document.getElementById('enviar');


var clientes = [];

boton.addEventListener('click', function () {
  var data = {
    mensaje: mensaje.value,
    usuario: usuario.value,
  };

  console.log(data.usuario)
  if (mensaje.value === '' || usuario.value === '') {
    alert('Se requiere un mensaje y un usuario para poder ingresar al chat');
  } else {
    mensaje.value = '';
    socket.emit('chat:mensaje', data);
  }
});

mensaje.addEventListener('keydown', function () {
  socket.emit('chat:escribiendo', usuario.value);
});

socket.on('chat:mensaje', function (data) {
  salida.innerHTML +=
    '<p class="text-small mb-0 text-muted" color = "white">' + data.usuario + ': ' + data.mensaje + ' </p>'


});

socket.on('chat:escribiendo', function (data) {
  notificaciones.innerHTML = '<p><em>' + data + '</em> está escribiendo...</p>';
});

socket.on('socket_desconectado', function (data) {
  console.log(data);
  clientes = clientes.filter(function (cliente) {
    console.log(cliente);
    return cliente.id != data.id;
  });
});

socket.on('socket_conectado', function (data) {
  console.log("Socket conectado")
  console.log(data);
});
