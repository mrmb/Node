/*
    Created By
      Marvin Mendez   @mrm3101

    Libs
      Jhonny Five
      Dualshock
*/


// libs init
johnnyFive = require("./lib/johnny-five");
board = new johnnyFive.Board();

var dualShock = require('dualshock-controller');
var r, l;

// Servo init
board.on("ready", function() {
  l = new johnnyFive.Servo({pin:11,type:"continuous"});
  r = new johnnyFive.Servo({pin:10,type:"continuous"});
});


//pass options to init the controller.
var controller = dualShock(
    {
        //you can use a ds4 by uncommenting this line.
        //config: "dualshock4-generic-driver",
        //if using ds4 comment this line.
        config : "dualshock4-generic-driver",
        //smooths the output from the acelerometers (moving averages) defaults to true
        accelerometerSmoothing : true,
        //smooths the output from the analog sticks (moving averages) defaults to false
        analogStickSmoothing : false
    });

  //make sure you add an error event handler
  controller.on('error', function(data) {
  //...someStuffDidNotWork();
});

//add event handlers:
controller.on('left:move', function(data) {
  //console.log(data);
  //...doStuff();

  // data = 8 bits from 0 that represent the lowest movement and 255 the highest movement. 
  if( data.y > 150 ) backward();
  if( data.y < 100 ) forward();

  if( data.x < 100 ) left();
  if( data.x > 150 ) right();

});

  controller.on('right:move', function(data) {
  //...doStuff();
  //console.log(data);
  // We must stop servos 
});


controller.on('connected', function(data) {
  //...doStuff();
});


controller.on('square:press', function (data) {
  console.log("Square Pressed");
});

controller.on('square:release', function (data) {
  console.log("Square Release");
});


controller.on('circle:release', function (data) {
  console.log("Circle Release");
});

//sixasis motion events:
//the object returned from each of the movement events is as follows:
//{
//    direction : values can be: 1 for right, forward and up. 2 for left, backwards and down.
//    value : values will be from 0 to 120 for directions right, forward and up and from 0 to -120 for left, backwards and down.
//}

//right-left movement
controller.on('rightLeft:motion', function (data) {
    //...doStuff();
});

//forward-back movement
controller.on('forwardBackward:motion', function (data) {
    //...doStuff();
});
//up-down movement
controller.on('upDown:motion', function (data) {
    //...doStuff();
});

//controller status
//as of version 0.6.2 you can get the battery %, if the controller is connected and if the controller is charging
controller.on('battery:change', function (value) {
     //...doStuff();
});
controller.on('connection:change', function (value) {
     //...doStuff();
});
controller.on('charging:change', function (value) {
     //...doStuff();
});


// Servos procedures. 

  stop = function () {
    // r.stop();
    // l.stop();
    // Not yet implemented 
  }

  forward = function () {
    r.ccw(1);
    l.cw(1);
  }

  backward = function () {
    r.cw(1);
    l.ccw(1);
  }

  left = function () {
    r.ccw(1);
    l.ccw(1);
  }

  right = function () {
    l.cw(1);
    r.cw(1);
  }




  //connect the controller
  controller.connect();



