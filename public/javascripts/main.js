window.addEventListener("load", function(){
  var canvas = document.getElementById("canvas");
  var sketch = new Sketch(canvas);
  var socket = io.connect("http://localhost:3000");

  sketch.init();

  // Socket Event
  socket.on("connect", function() {
    socket.on('sync', function(data) {
      var img = new Image();
      var url = data;
      img.onload = function() {
        sketch.setImageData(img);
      };
      img.src = url;
    });

    socket.on("draw", function(data) {
      switch (data.act) {
        case "start": sketch.startDraw(data.x, data.y); break;
        case "move":  sketch.moveDraw(data.x, data.y); break;
        case "end":   sketch.endDraw(data.x, data.y);  break;
      }
    });
  });
  
  // Draw Event
  canvas.addEventListener("mousedown", function(e){
    sketch.startDraw(e.clientX, e.clientY);
    socket.emit("draw", { act: "start", x: e.clientX, y: e.clientY}); 
  }, false);

  window.addEventListener("mousemove", function(e){
    sketch.moveDraw(e.clientX, e.clientY);
    if(sketch.down) socket.emit("draw", { act: "move", x: e.clientX, y: e.clientY}); 
  }, false);

  window.addEventListener("mouseup", function(e){ 
    sketch.endDraw(e.clientX, e.clientY);
    socket.emit("draw", { act: "end", x: e.clientX, y: e.clientY}); 
  }, false);
}, false);
