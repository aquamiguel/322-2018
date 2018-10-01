/*
Project goal: to illustrate object-oriented design in Javascript.

TODO: create 2 or more boxes whose colors can be individually toggled.
*/

(function() {
  let canvas = document.getElementById('game');
  let ctx    = canvas.getContext('2d');

  box = {
     x    :  0 ,
     y    : 50 ,
     w    : 80 ,
     h    : 32 ,
    dx    :  2 ,
    color : '#ff0000'
  };

  box.toggleColor = function() {
    if (this.color === '#ff0000') {
      this.color = '#00ff00';
    } else {
      this.color = '#ff0000';
    }
  };

  box.anim = function() {
    this.x += this.dx;
    if (this.x > canvas.width) this.x = 0;
    ctx.fillStyle = this.color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(this.x, this.y, this.w, this.h);
    window.requestAnimationFrame(this.anim.bind(this));
  };

  box.click = function(x, y) {
    rect  = canvas.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    if (
      x > this.x            && 
      x < this.x + this.w   && 
      y > this.y            && 
      y < this.y + this.h
    )
    this.toggleColor();
  };

  window.requestAnimationFrame(box.anim.bind(box));

  canvas.addEventListener(
    "mousedown",
    function(e) { box.click(e.clientX, e.clientY); },
    false
  );

})();
