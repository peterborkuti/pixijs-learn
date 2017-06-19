function runGame() {
  var
    app,
    player;

  function createPlayer() {
    var circle = new PIXI.Graphics();
    var color = '0x'+(Math.random()*0xFFFFFF<<0).toString(16);
    var r = Math.floor(Math.random() * 64);
    console.log(color);
    circle.beginFill(color);
    circle.drawCircle(r, r, r);
    circle.endFill();
    circle.x = r;
    circle.y = r;

    var sprite = new PIXI.Sprite(circle.generateCanvasTexture());
    sprite.vx = Math.random() * 5 + 1;
    sprite.vy = Math.random() * 5 + 1;;
    sprite.toString = function() {
      return this.x + "," + this.y + "," + this.vx + "," + this.vy;
    }

    return sprite;
  }

  function setup() {
    //Create the renderer
    app = new PIXI.Application();

    //Add the canvas to the HTML document
    document.body.appendChild(app.view);
    //app.stage = new PIXI.particles.ParticleContainer();

    for (var i = 0; i < 100; i++) {
      player = createPlayer();
      //or comment it to use Container which is automatically created

      app.stage.addChild(player);
    }

    app.ticker.add(loop);

  }

  function loop() {
    play();
  }

  function bounce(player) {
    player.x += player.vx;
    player.y += player.vy;

    if (player.x <= 0) {
      player.x = 0
      player.vx = Math.abs(player.vx);;
    }
    if (player.x >= app.renderer.width - player.width) {
      player.x = app.renderer.width - player.width;
      player.vx = - Math.abs(player.vx);
    }
    if (player.y <= 0) {
      player.y = 0
      player.vy = Math.abs(player.vy);
    }
    if (player.y >= app.renderer.height - player.height) {
      player.y = app.renderer.height - player.height;
      player.vy = - Math.abs(player.vy);
    }
  }

  function play() {
    for (var i = 0; i <app.stage.children.length; i++) {
      bounce(app.stage.children[i]);
    }
  }

  setup();
  requestAnimationFrame(loop);

  return {app: app, player: player}
}

var game = runGame();
