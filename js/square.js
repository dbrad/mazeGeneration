function Square(game, size, x, y, color) {
  var _x = x || 0;
  var _y = y || 0;
  var _size = size;

  this.sprite = new createjs.Shape();
  this.sprite.graphics.beginFill(color).drawRect(0, 0, _size, _size).endFill();
  this.sprite.x = _x;
  this.sprite.y = _y;

  game.screen.addChild(this.sprite);

  this.changeColor = function(color) {
    this.sprite.graphics.clear().beginFill(color).drawRect(0, 0, _size, _size).endFill();
    this.sprite.x = _x;
    this.sprite.y = _y;
  }
};

Square.prototype.x = function(x) {
  if( typeof x === "undefined" )
    return this.sprite.x;
  this.sprite.x = x;
};
Square.prototype.y = function(y) {
  if( typeof y === "undefined" )
    return this.sprite.y;
  this.sprite.y = y;
};

Square.prototype.init = function() {};
Square.prototype.update = function(delta) {};
Square.prototype.render = function(delta) {};
