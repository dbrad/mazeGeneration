var Game = {
  updateDelta: 0,
  renderDelta: 0,

  frameRate: 60.0,
  Entities: [],

  init: function() {
    var self = this;
    this.updateRate = (this.frameRate * 2);
    this.renderTiming = 1000/this.frameRate;
    this.updateTiming = 1000/this.updateRate;

    this.screen = new createjs.Stage("screen");

    this.Entities.push(new Square(this, 530, 135, 50, '#000000'));
    this.Entities.push(new Maze(this, 51, 51, 145, 60));

    this.Entities.forEach(function(entity) {
      entity.init();
    });
  },

  update: function(delta) {
    this.updateDelta += delta;
    if(this.updateDelta >= this.updateTiming) {
      this.updateDelta -= this.updateTiming;
      Profiler.updateCounter++;
      this.Entities.forEach(function(entity) {
        entity.update(delta);
      });
    }
    Profiler.update(delta);
  },
  render: function(delta) {
    this.renderDelta += delta;
    if(this.renderDelta >= this.renderTiming) {
      this.renderDelta -= this.renderTiming;
      Profiler.renderCounter++;
      $('#output').html("Updates per Sec: " + Profiler.UPS + "<br>Renders Per Sec: " + Profiler.FPS);
      this.screen.update();
    }
    Profiler.render(delta);
  }
};
