function Sketch(canvas) {
  this.canvas = canvas;  
  this.ctx = canvas.getContext("2d");
}

Sketch.prototype =
{
  WIDTH : 1440,
  HEIGHT: 900,

  down :  false,

  init : function() {
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;
    this.clear();
    this.ctx.strokeStyle = "rgb(255, 255, 255)";
  },

  clear : function() {
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
    //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },

  setImageData : function(img) {
    this.ctx.drawImage(img, 0, 0);
  },

  getImageData : function () {
    return this.canvas.toDataURL();
  },

  draw : function (x, y, toX, toY) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(toX, toY);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

// for server
if (typeof module != 'undefined') {
  module.exports = Sketch;
}
