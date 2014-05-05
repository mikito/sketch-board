window.addEventListener("load", function(){
  var canvas = document.getElementById("canvas");
  var sketch = new Sketch(canvas);
  var socket = io.connect();

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
      sketch.draw(data.x, data.y, data.toX, data.toY);
    });

    socket.on("clear", function() {
      sketch.clear();
    });
  });
  
  var prevX = 0,
      prevY = 0,
      down = false;

  // Draw Event
  canvas.addEventListener("mousedown", function(e){
      prevX = e.clientX;
      prevY = e.clientY;
      down = true;
  }, false);

  window.addEventListener("mousemove", function(e){
      if(down == false) return;
      sketch.draw(prevX, prevY, e.clientX, e.clientY);
      socket.emit("draw", {x: prevX, y: prevY,  toX: e.clientX, toY: e.clientY}); 
      prevX = e.clientX;
      prevY = e.clientY;
  }, false);

  window.addEventListener("mouseup", function(e){ 
      if(down == false) return;
      down = false;
  }, false);

  var clearButton = document.getElementById("clear");
  clearButton.addEventListener('click', function (e) {
    sketch.clear();
    socket.emit("clear"); 
  }, false);
}, false);
