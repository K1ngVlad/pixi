////////////////////////////Проверка поддержки браузера WebGL
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
};

/////////////////////////////Использование альтернативных имён
const sprite = PIXI.Sprite, 
loader = PIXI.Loader.shared,
res = PIXI.Loader.shared.resources,
render = PIXI.Application,
retex = PIXI.utils.TextureCache,
container = PIXI.Container,
partContainer = PIXI.ParticleContainer,
graphics = PIXI.Graphics,
text = PIXI.Text,
sty = PIXI.TextStyle;
//hit = PIXI.hitTestRectangle;
/////////////////////////////

let app;
////////////////////////////Создание области рендеринга и сцены
app = new render({width: 640, height: 640});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x76cbec;
app.stage;

////////////////////////////Загрузка изображений
console.log("Loading...");
loader.add([{name:"trailImg", url:"images/trailset.json"}, {name:"wallImg", url:"images/wall.png"},{name:"playerImg", url:"images/playerset.json"}, {name:"slimeImg", url:"images/slime.json"}, {name: "backWallImg", url:"images/backWall.png"}]);
loader.onProgress.add(showProgress);
loader.onError.add(reportError);
loader.onComplete.add(doneLoading);
loader.load(setup);

////////////////////////////Отслеживание прогресса и неполадок
function showProgress(e, r) {
  console.log(r.url);
  console.log(e.progress + "%");
};
function reportError(e) {
  console.log("ERROR: " + e.message);
};
function doneLoading() {
  console.log("LOADING COMPLETE!");
};

////////////////////////////Объявление игровых объектов
let player,
b,
playerLeft,
playerRight,
playerBack,

wall,
backWall,

trail,
trailEnd,
trailTurn,

slime,
slimeOrange,
slimeBlue,
slimeYellow,
slimeDarkBlue,
slimeGreen,
slimeDarkGreen,

state,
message,
circle,
style,
time = 0;

////////////////////////////Установка игровых объектов
function setup() {
  console.log("Setup...");
 

  let id0 = res["trailImg"].textures,
  id1 = res["playerImg"].textures,
  id2 = res["slimeImg"].textures;

  trail = new sprite(id0['trail.png']);
  trailEnd = new sprite(id0['trail_end.png']);
  trailTurn = new sprite(id0['trail_turn.png']);

  player = new sprite(id1['player.png']);
  slime = new partContainer();
  slimeOrange = new sprite(id2["orangeSlime.png"]);
  slimeOrange.scale.set(2, 2);
  slimeOrange.position.set(10, 10);
  slimeBlue = new sprite(id2["blueSlime.png"]);
  slimeBlue.scale.set(2, 2);
  slimeBlue.position.set(42, 42);
  slimeYellow = new sprite(id2["yelowSlime.png"]);
  slimeYellow.scale.set(2, 2);
  slimeYellow.position.set(74, 74);
  slimeDarkBlue = new sprite(id2["darkBlueSlime.png"]);
  slimeDarkBlue.scale.set(2, 2);
  slimeDarkBlue.position.set(106, 106);
  slimeGreen = new sprite(id2["greenSlime.png"]);
  slimeGreen.scale.set(2, 2);
  slimeGreen.position.set(138, 138);
  slimeDarkGreen = new sprite(id2["darkGreenSlime.png"]);
  slimeDarkGreen.scale.set(2, 2);
  slimeDarkGreen.position.set(180, 180);

  slime.addChild(slimeOrange);
  slime.addChild(slimeBlue);
  slime.addChild(slimeYellow);
  slime.addChild(slimeDarkBlue);
  slime.addChild(slimeGreen);
  slime.addChild(slimeDarkGreen);

////////////////////////////Создание фона из спрайтов
  for(n = 0;n < 10;n++) {
    for(i = 0;i < 10;i++) {
      wall = new sprite(
      res["wallImg"].texture);
      wall.scale.set(2, 2);
      wall.anchor.set(0.5, 0.5);
      wall.position.x = 32 + i * 64;
      wall.position.y = 32 + n * 64;
      app.stage.addChild(wall);
    }
  }
  for(n = 0;n < 10;n++){
    if(n === 0 || n === 9)  {
    for(i = 0;i < 10;i++){
      backWall = new sprite(
      res["backWallImg"].texture);
      backWall.scale.set(2, 2);
      backWall.anchor.set(0.5, 0.5);
      backWall.position.x = 32 + i * 64;
      backWall.position.y = 32 + n * 64;
      app.stage.addChild(backWall);
      }
    }
    else {
      for(i = 0;i < 10; i += 9) {
      backWall = new sprite(
      res["backWallImg"].texture);
      backWall.scale.set(2, 2);
      backWall.anchor.set(0.5, 0.5);
      backWall.position.x = 32 + i * 64;
      backWall.position.y = 32 + n * 64;
      app.stage.addChild(backWall);
    }
  }
  }

  //b = new Bump(PIXI);

 // if  ( hitTestRectangle ( player,  slimeBlue ) )  { 

    //console.log('yes');
  //}  else  { 
    //console.log('no');
  //} 

  console.log(PIXI);
  style = new sty({
    fontFamily: "Arial",
    fontSize: 36,
    fill: "white",
    stroke: '#ff3300',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
  });

  message = new text("Страдай, играя в мою игру!!!", style);
  


  circle = new graphics();
  circle.beginFill(0x9966FF);
  circle.lineStyle(4, 0x000000, 0.5);
  circle.drawCircle(0, 0, 32);
  circle.endFill();
  circle.x = 300;
  circle.y = 130;
  app.stage.addChild(circle);

  app.stage.addChild(slime);

////////////////////////////Создание игрока
player.scale.set(2, 2);
player.anchor.set(0.5, 0.5);
player.position.set(324, 128);
  app.stage.addChild(player);
  //player = new sprite(
  //res["playerImg"].texture);
  //player.scale.set(2, 2);
 //player.anchor.set(0.5, 0.5);
  //player.position.set(64, 128);
  //app.stage.addChild(player);


  let left = keyboard("ArrowLeft"),
  up = keyboard("ArrowUp"),
  right = keyboard("ArrowRight"),
  down = keyboard("ArrowDown");

  player.vx = 0;
  player.vy = 0; 

  left.press = () => {
    if((up.isUp || down.isUp) && player.x !== 640)
    switch (true) {
      case right.isDown:
        player.vx = 0;
        break;
        case up.isUp && down.isUp:
          player.texture = retex['playerLeft.png'];
      default:
        player.vx = -5;
        break;
    }
  } ;
  left.release = () => {
    if(up.isUp || down.isUp){
      if (right.isDown) {
        player.vx = 5;
      }
      else {
        player.vx = 0;
      }
      switch (true) {
      case down.isDown:
        player.texture = retex['player.png'];
        break;
      case up.isDown:
        player.texture = retex['playerBack.png'];
        break;
      case right.isDown:
        player.texture = retex['playerRight.png'];
        break;
    }
    if (right.isDown) {
      player.vx = 5;
      player.texture = retex['playerRight.png'];
    }
    else {
      player.vx = 0;
    }
  }
  };
  up.press = () => {
    if(right.isUp || left.isUp) {
    switch (true) {
      case down.isDown:
        player.vy = 0;
        break;
      case right.isUp && left.isUp:
        player.texture = retex['playerBack.png'];
      default:
        player.vy = -5;
        break;
    }
  }
  };
  up.release = () => {
    if(right.isUp || left.isUp) {
    if (down.isDown) {
      player.vy = 5;
    }
    else {
      player.vy = 0;
    }
    switch (true) {
    case right.isDown:
      player.texture = retex['playerRight.png'];
      break;
    case left.isDown:
      player.texture = retex['playerLeft.png'];
      break;
    case down.isDown:
      player.texture = retex['player.png'];
      break;
  }
}
  };
  right.press = () => {
    if(up.isUp || down.isUp) {
    switch (true) {
      case left.isDown:
        player.vx = 0;
        break;
        case up.isUp && down.isUp:
        player.texture = retex['playerRight.png'];
      default:
        player.vx = 5;
        break;
      }
    } 
  };
  right.release = () => {
    if(up.isUp || down.isUp) {
      if (left.isDown) {
        player.vx = -5;
      }
      else {
        player.vx = 0;
      }
      switch (true) {
      case down.isDown:
        player.texture = retex['player.png'];
        break;
      case up.isDown:
        player.texture = retex['playerBack.png'];
        break;
      case left.isDown:
        player.texture = retex['playerLeft.png'];
        break;
      } 
    }
    };

  down.press = () => {
    if(right.isUp || left.isUp) {
    switch (true) {
      case up.isDown:
        player.vy = 0;
        break;
        case right.isUp && left.isUp:
        player.texture = retex['player.png'];
      default:
        player.vy = 5;
        break;
    }
  }
    };

    down.release = () => {
      if(right.isUp || left.isUp) {
      if (up.isDown) {
        player.vy = -5;
      }
      else {
        player.vy = 0;
      }
      switch (true) {
      case right.isDown:
        player.texture = retex['playerRight.png'];
        break;
      case left.isDown:
        player.texture = retex['playerLeft.png'];
        break;
      case up.isDown:
        player.texture = retex['playerBack.png'];
        break;
      }
    }
    };

    state = play;

////////////////////////////Обновление игры на каждый тик
  app.ticker.add(delta => gameLoop(delta));

      console.log("SETUP COMPLETE!");
  }

////////////////////////////Обновление
  function gameLoop(delta) {
    state(delta);
    }

////////////////////////////Событие
  function play(delta) {
    if (time<30){
      time++;
    }
    else{
      time = 0;
    }
    //console.log(time);
    player.x += player.vx;
    player.y += player.vy;
  }

  //stone.position.set(100, 100);
  //stone.scale.set(0.5, 0.5);
  //stone.anchor.set(0.5, 0.5);
  //stone.rotation = 0.5;
  //app.stage.addChild(stone);
  //app.ticker.add(delta => gameLoop(delta));


  //Функция регистрирования событий клавиатуры
  function keyboard(value) {
    //Создание объекта для регестрирования событий клавиатуры
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    //Клавиша нажата
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //Клавиша отпущена
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Создание регистрации события
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    //Присоединение события
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    //Отсоединение события
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }


  