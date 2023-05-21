const express = require('express');
var app = require('express')();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path')
app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), () => console.log(`Servidor iniciado en: ${process.env.PORT}`));

//dotenv ?
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/systemStatus', async (req, res) => {
  const localhost = req.headers.host;
  res.status(200).send( `El proyecto está desplegado en: ${localhost}`  );
  

})



app.get('/:nombre', function (req, res) {
  let nombre = req.params.nombre
  console.log(nombre)
  res.render('index', { nombre })

});
io.on('connection', function (socket) {
  console.log('socket conectado', socket.id);
  io.emit('conectado', { texto: 'Nuevo socket conectado: ' + socket.id + `<br>` });

  socket.on('disconnect', () => {
    console.log('socket desconectado', socket.id);
    io.emit('desconectado',
      { texto: 'Socket desconectado.' + socket.id + `<br>` });

  });

  socket.on('chat:mensaje', (data) => {
    io.emit('chat:mensaje', data);

  });

  socket.on('chat:escribiendo', (usuario) => {
    socket.broadcast.emit('chat:escribiendo', usuario);
    //    io.emit('chat:mensaje', data);

  });
});
