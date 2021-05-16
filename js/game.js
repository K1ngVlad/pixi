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
app = new render({width: innerWidth, height: innerHeight});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x76cbec;
app.stage;

////////////////////////////Объявление игровых объектов
console.log("Объявление игровых объектов");
let player = {},
cube = {},
mapSquare,
gameMode,
card1,
card2,
card3,
card4,
time,
space,
style,
waitText;
;

////////////////////////////Загрузка изображений
console.log("Загрузка ресурсов...");
loader.add({name:"playerImg", url:"images/playerset.json"});
loader.add({name: "cubesImg", url:"images/cubes.json" });
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
    console.log("ОШИБКА: " + e.message);
  };
  function doneLoading() {
    console.log("ЗАГРУЗКА ЗАВЕРШЕНА!");
  };
  function setup() {
    console.log("Установка объектов...");

    console.log("Макет центральной карты");

    drawSprite(mapSquare, 0x000000, 640, 640, 640, 110);

    console.log("Макеты игровых карт");

    drawSprite(card1, 0x000000, 384, 512, 128, 14);
    drawSprite(card2, 0x000000, 384, 512, 1408, 14);
    drawSprite(card3, 0x000000, 384, 512, 128, 554);
    drawSprite(card1, 0x000000, 384, 512, 1408, 554);

    console.log("Игральная кость");

    cube.vaule = 1;
    cube.swap = 6;
    cube.roll = function() {
      if(cube.swap){
        if(!time) {
        cube.vaule = ranNum(6);
        cube.sprite.texture = retex['cube' + cube.vaule + '.png'];
        cube.swap--;
          time++;
      }else{
        time++;
        if(time === 4){time = 0;}
      }}
        else {console.log("Выпадает " + cube.vaule); return goMoving()};
       
}
    cube.toRolling = function(num) {
      this.swap = num;
      gameMode = wait;
      return this;}
    cube.cubeSprite = letSprite;
    cube.sprites = res["cubesImg"].textures;
    cube.cubeSprite('cube1.png', 896, 366);

      console.log("Игровой персонаж");

    player.moving = function() {
      switch (true) {
          case this.sprite.x < 1216 && this.sprite.y === 174:
            this.sprite.vx = 32;
              this.sprite.vy = 0;
              break;
          case this.sprite.x === 1216 && this.sprite.y < 686:
            this.sprite.vy = 32;
              this.sprite.vx = 0;
                  break;
          case this.sprite.x > 704 && this.sprite.y === 686:
            this.sprite.vx = -32;
              this.sprite.vy = 0;
                  break;
          case this.sprite.x === 704 && this.sprite.y > 174:
            this.sprite.vy = -32;
              this.sprite.vx = 0;
              break;
              this.sprite.vx = 0;
              this.sprite.vy = 0;
      }
      this.sprite.x += this.sprite.vx;
      this.sprite.y += this.sprite.vy;
      //console.log(player.sprite.x, player.sprite.y);    
      this.steps--;
      return this;
    }


    player.sprites = res["playerImg"].textures;
    player.playerSprite = letSprite;
    player.playerSprite('player.png', 704, 174, 0.5, 0.5);

    console.log("Управление");

    space = keyboard(" ");

    space.release = () => { if(gameMode = wait) {
        console.log("Пробел отпущен");
        time = 0;
        gameMode = rolling;}
        
    }

    style = letStyle("Arial", 36, "white", '#ff3300', 4);
    //waitText = new Text("Hello Pixi!", style);
    //waitText.position.set(100, 300);
    //app.stage.addChild(waitText);

    console.log("Подготовка к запуску");

    gameMode = wait;

      ////////////////////////////Обновление игры на каждый тик
    app.ticker.add(delta => gameLoop(delta));
    console.log("ЗАПУСК ИГРЫ");

    }

    ////////////////////////////Обновление
    function gameLoop(delta) {
    gameMode(delta);
    }

////////////////////////////События 
function wait(delta){}

function rolling(delta) {
  cube.roll();
}

function move(delta) {
  player.moving();
  if(!player.steps){cube.toRolling(6);}
  }

//////////////////////////Вспомогательные функции
function goMoving(){
  player.steps = cube.vaule * 4;
  gameMode = move;
}

function drawSprite(sprite, color, width, higth, x, y) {
  sprite = new graphics();
  sprite.beginFill(color);
  sprite.drawRect(0, 0, width, higth);
  sprite.endFill();
  sprite.x = x; //1280
  sprite.y = y; //440
app.stage.addChild(sprite);
}

  function ranNum(num) {return Math.ceil(Math.random() * num);}

  function letStyle(fontFamily = "", fontSize = 0, fill = "", stroke = "", strokeThickness = 0, dropShadow = false, dropShadowColor = "", dropShadowBlur = 0, dropShadowAngle = 0, dropShadowDistance = 0) {
    style = new sty({
      fontFamily: fontFamily,
      fontSize: fontSize,
      fill: fill,
      stroke: stroke,
      strokeThickness: strokeThickness,
      dropShadow: dropShadow,
      dropShadowColor: dropShadowColor,
      dropShadowBlur: dropShadowBlur,
      dropShadowAngle: dropShadowAngle,
      dropShadowDistance: dropShadowDistance,
  })}

  function letSprite(url = '', x = 0, y = 0, anX = 0, anY = 0) {
    this.sprite = new sprite(this.sprites[url]);
    this.sprite.position.set(x, y);
    this.sprite.anchor.set(anX, anY);
    app.stage.addChild(this.sprite);
    return this;}

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

 