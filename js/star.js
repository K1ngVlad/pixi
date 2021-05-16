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
app = new render({width: window.innerWidth, height: window.innerHeight});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x000000;
app.stage;

console.log("Loading...");
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

function ran() {
  let num = Math.random() *  Math.PI;
  let bool = Math.round(Math.random());
  if(bool) {
  num = -num;
  }
  return num;
  }

  function ranNum(n) {
   return Math.round(Math.random() * n);
  }
  
  
  function setup() {
  for(r=150; r<=1500; r++) {
  for(i=0; i<=13; i++){
  let circle = new graphics();
  switch (ranNum(10)) {
    case 0:
circle.beginFill(0x00FFFF);
circle.lineStyle(ranNum(3), 0x00FFFF, Math.random());
break;
    case 1:
circle.beginFill(0xE0FFFF);
circle.lineStyle(ranNum(3), 0xE0FFFF, Math.random());
break;   
   case 2:
circle.beginFill(0xB0E0E6);
circle.lineStyle(ranNum(3), 0xB0E0E6, Math.random());
break;   
   case 3:
circle.beginFill(0xADD8E6);
circle.lineStyle(ranNum(3), 0xADD8E6, Math.random());
break;   
   case 4:
circle.beginFill(0x87CEFA);
circle.lineStyle(ranNum(3), 0x87CEFA, Math.random());
break;   
   case 5:
circle.beginFill(0xFFFFFF);
circle.lineStyle(ranNum(3), 0xFFFFFF, Math.random());
break;   
   case 6:
circle.beginFill(0xF0F8FF);
circle.lineStyle(ranNum(3), 0xF0F8FF, Math.random());
break;   
   case 7:
circle.beginFill(0xFFFFE0);
circle.lineStyle(ranNum(1), 0x00FFFF, Math.random());
break;   
   case 8:
circle.beginFill(0xFFFACD);
circle.lineStyle(ranNum(1), 0xFFFACD, Math.random());
break;   
   case 9:
circle.beginFill(0xFF7F50);
circle.lineStyle(ranNum(1), 0xFF7F50, Math.random());
break;   
   case 10:
circle.beginFill(0xF0E68C);
circle.lineStyle(ranNum(1), 0xF0E68C, Math.random());
break;   
    }
    circle.drawCircle(0, 0, 1);
    circle.endFill();
circle.lineStyle(ranNum(3), 0x00FFFF, Math.random());
  circle.endFill();
  switch (true) {
    case i === 0 || i === 4:
      circle.x = - 10 + r + r * Math.cos(ran());
      circle.y = - 10 + r + r * Math.sin(ran());
    break;
    case i === 1 || i === 5:
    circle.x = window.innerWidth + 10 - r + r * Math.cos(ran());
    circle.y = window.innerHeight + 10 - r + r * Math.sin(ran());
    break;
    case i === 2 || i === 6:
      circle.x = window.innerWidth + 10 - r + r * Math.cos(ran());
      circle.y = - 10 + r + r * Math.sin(ran());
    break;
    case i === 3 || i === 7:
      circle.x = - 10 + r + r * Math.cos(ran());
      circle.y = window.innerHeight + 10 - r + r * Math.sin(ran());
   break;
   default:
      circle.x = 960 + r * Math.cos(ran());
      circle.y = 500 + r * Math.sin(ran());
     break;
  }
  app.stage.addChild(circle);
  }
  }
  }
  //for(r=0; r<=2000; r++) {
    //for(i=0; i<=2; i++){
    //let circle = new graphics();
    //circle.beginFill(0x00FFFF);
    //circle.lineStyle(ranNum(2), 0x00FFFF, 0.5);
    //circle.drawCircle(0, 0, 1);
    //circle.endFill();
    //circle.x = window.innerWidth + 100 - r + r * Math.cos(ran());
    //circle.y = window.innerHeight + 100 - r + r * Math.sin(ran());
    //app.stage.addChild(circle);
    //}
    //}
    //for(r=0; r<=2000; r++) {
      //for(i=0; i<=2; i++){
      //let circle = new graphics();
      //circle.beginFill(0x00FFFF);
      //circle.lineStyle(ranNum(2), 0x00FFFF, 0.5);
      //circle.drawCircle(0, 0, 1);
      //circle.endFill();
      //circle.x = window.innerWidth + 100 - r + r * Math.cos(ran());
      //circle.y = - 100 + r + r * Math.sin(ran());
      //app.stage.addChild(circle);
      //}
      //}
      //for(r=0; r<=2000; r++) {
        //for(i=0; i<=2; i++){
        //let circle = new graphics();
        //circle.beginFill(0x00FFFF);
        //circle.lineStyle(ranNum(2), 0x00FFFF, 0.5);
        //circle.drawCircle(0, 0, 1);
        //circle.endFill();
        //circle.x = - 100 + r + r * Math.cos(ran());
        //circle.y = window.innerHeight + 100 - r + r * Math.sin(ran());
        //app.stage.addChild(circle);
        //}
        //}
    

//for(r=0; r<=500; r++) {
//for(i=0; i<=3; i++){
//let circle = new graphics();
//circle.beginFill(0x00FFFF);
////circle.lineStyle(ranNum(2), 0x00FFFF, 0.5);
//////circle.drawCircle(0, 0, 1);
//circle.endFill();
//circle.x = 400 + r * Math.cos(ran());
//circle.y = 400 + r * Math.sin(ran());
//app.stage.addChild(circle);
//}
//}

  
