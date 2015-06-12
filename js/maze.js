function Maze(game, w, h, x, y) {
  var offsetX = x;
  var offsetY = y;
  this._w = w;
  this._h = h;

  function Cell(game, x, y) {
    this.type = 'W';
    this.x = x;
    this.y = y;
    this.square = new Square(game, 10, (this.x * 10) + offsetX, (this.y * 10) + offsetY, '#000000');
  }

  var self = this;
  var grid = [];

  this.init = function() {
    grid = [];
    for(var x = 0; x < this._w; x++) {
      grid[x] = [];
      for(var y = 0; y < this._h; y++) {
        grid[x][y] = new Cell(game, x, y);
      }
    }
    _.delay(_.bind(this.GenerateMaze, this), 50);
  };

  this.getCell = function(x,y) {
    if( (x >= 0) && (x < self.getWidth()) && (y >= 0) && (y < self.getHeight()) )
      return grid[x][y];
    else
      return undefined;
  }

  this.getWidth = function() {
    return grid.length;
  }

  this.getHeight = function() {
    return grid[0].length;
  }

  this.getWalls = function(x,y) {
    var walls = [];
    for( var dx = -1; dx < 2; dx++ ) {
      var cell = self.getCell(x+dx, y);
      if( cell != undefined && cell.type == 'W' ) {
        cell.dir = 'x' + dx;
        walls.push( cell );
      }
    }
    for( var dy = -1; dy < 2; dy++ ) {
      var cell = self.getCell(x, y+dy);
      if( cell != undefined && cell.type == 'W' ) {
        cell.dir = 'y' + dy;
        walls.push( cell );
      }
    }
    return walls;
  }

  this.GenerateMaze = function() {
    var seedX = Math.floor( Math.random() * this.getWidth() );
    if( seedX % 2 == 1 ) seedX -= 1;
    var seedY = Math.floor( Math.random() * this.getHeight() );
    if( seedY % 2 == 1 ) seedY -= 1;

    var currentCell = this.getCell(seedX, seedY);
    var walls = [];

    do {
      walls = _.union(walls, this.getWalls(currentCell.x, currentCell.y));
      var wallCheck = walls[Math.floor(Math.random() * walls.length)];
      var zip = undefined;

      switch ( wallCheck.dir ) {
        case 'x1':
          zip = this.getCell(wallCheck.x+1,wallCheck.y);
          break;
        case 'x-1':
          zip = this.getCell(wallCheck.x-1,wallCheck.y);
          break;
        case 'y1':
          zip = this.getCell(wallCheck.x,wallCheck.y+1);
          break;
        case 'y-1':
          zip = this.getCell(wallCheck.x,wallCheck.y-1);
          break;
        default:
          break;
      }

      if( zip && zip.type == 'W' ) {
        zip.type = 'M';
        zip.square.changeColor('#FFFFFF');
        wallCheck.type = 'P';
        wallCheck.square.changeColor('#FFFFFF');
        currentCell = zip;
      } else {
        wallCheck.type = 'D';
      }

      walls = _.reject( walls, function( cell ) { return cell.type != 'W'; });
    } while (!_.isEmpty(walls))
  }
};

Maze.prototype.update = function(delta) {};
Maze.prototype.render = function(delta) {};
