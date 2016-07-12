//Install Modules
var com = require("serialport");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//create a bart oobject that queries the API every 5 seconds, use npm install bart to install
var bart = require('bart').createClient({"interval":20000});

//console.log(bart);
//if(bart.emitter.domain){ 
  bart.on('mont', function(estimates){
    var goNorth = {};
    var goSouth = {};
    
    for(var i=0;i<estimates.length;i++){
      if(estimates[i].direction == "North"){
        if(isEmpty(goNorth) || estimates[i].minutes < goNorth.minutes){
          goNorth = estimates[i];
        }
      }else if(estimates[i].direction == "South"){
        if(isEmpty(goSouth) || estimates[i].minutes < goSouth.minutes){
          goSouth = estimates[i];
        }
      }
      //console.log(estimates[i]);
    }

    console.log(estimates)

    //console.log(goNorth);
    //console.log(goSouth);

    if(isEmpty(goNorth) == false){
      io.sockets.emit('north',{
        est: goNorth
      });
    }

    if(isEmpty(goSouth) == false){
      io.sockets.emit('south',{
        est: goSouth
      });
    }
  });
// }
// else{
//   console.log("Bart is now closed");
// }

/*
var serialPort = new com.SerialPort("/dev/cu.usbmodem1411", {
    baudrate: 115200,
    parser: com.parsers.readline('\r\n')
});



serialPort.on('open', function() {
    console.log('Port open');
});

serialPort.on('data', function(data) {
  var val = {};
  try{
    val = JSON.parse(data);
  }
  catch(e){}
  io.sockets.emit('data', {
      val: val
  });
  console.log(val);
});
*/

app.use(express.static('public'));

//Serve index.html when some make a request of the server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}