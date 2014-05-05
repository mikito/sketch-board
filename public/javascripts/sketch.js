function Sketch(canvas) {
  this.canvas = canvas;  
  this.ctx = canvas.getContext('2d');
}

Sketch.prototype =
{
  down :  false,

  init : function() {
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = 'rgb(255, 255, 255)';
    this.setEventListener();
  },

  setEventListener : function() {
    this.canvas.addEventListener('mousedown', this.startDraw.bind(this), false);
    window.addEventListener('mousemove', this.moveDraw.bind(this), false);
    window.addEventListener('mouseup', this.endDraw.bind(this), false);
  },

  startDraw : function (e) {
    this.ctx.beginPath();
    this.ctx.moveTo(e.clientX, e.clientY);
    this.down = true;
  },

  moveDraw : function (e) {
    if(this.down == false) return;
    this.ctx.lineTo(e.clientX, e.clientY);
    this.ctx.stroke();
  },

  endDraw : function (e) {
    if (this.down == false) return;
    this.ctx.lineTo(e.clientX, e.clientY);
    this.ctx.stroke();
    this.ctx.closePath();
    this.down = false;
  }
}

window.addEventListener('load', function(){
  var sketch = new Sketch(document.getElementById('canvas'));
  sketch.init();
}, false);


