function Sketch(canvas) {
  this.canvas = canvas;  
  this.ctx = canvas.getContext("2d");
}

Sketch.prototype =
{
  WIDTH : 640,
  HEIGHT: 320,

  down :  false,

  init : function() {
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "rgb(255, 255, 255)";
  },

  setImageData : function(img) {
    this.ctx.drawImage(img, 0, 0);
  },

  getImageData : function () {
    return this.canvas.toDataURL();
  },

  startDraw : function (x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.down = true;
  },

  moveDraw : function (x, y) {
    if(this.down == false) return;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  },

  endDraw : function (x, y) {
    if (this.down == false) return;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.down = false;
  }
}

// for server
if (typeof module != 'undefined') {
  module.exports = Sketch;
}
