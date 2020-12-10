module.exports = function(io){

  var express = require('express');
  var router = express.Router();

  const history = [];

  router.get('/', function(req, res, next) {
    res.render('index', { title: 'WhiteBoard Collaborative Application' });
  });


  io.on('connection',(socket)=>{

    console.log('New Student is connected');

    console.log('Syncing new user"s canvas from history')
    for(let item of history)
      socket.emit('update_canvas',item);

    socket.on('update_canvas',function(data){

      history.push(data);

      socket.broadcast.emit('update_canvas',data);
    });
  })
  
  return router;
}