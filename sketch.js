
var background

var car1;

var START = 0;
var PLAY = 1;

var gameState = START;

var score = 0;
var button1;
var coin;
var car2;
var carsGroup;

var coinsGroup;

function preload() {

  trackImg = loadImage("track1.jpg");

  carImg = loadImage("car1.png");

  coinImg = loadImage("coin1.png");

  car2Img = loadImage("car2.png");
  car3Img = loadImage("car3.png");
  car4Img = loadImage("car4.png");
  car5Img = loadImage("car5.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  track = createSprite(width / 2, height / 2, 100, height)
  track.addImage("track", trackImg);
  track.velocityY = 4;
  track.height / 2;

  track.scale = 2;

  car1 = createSprite(width / 2, height - 100, 10, 10);
  car1.addImage("car", carImg);
  car1.scale = 0.7;

  coinsGroup = createGroup();
  carsGroup = createGroup();

  button1 = createButton("start");

}



function draw() {
  background(255);

  if (gameState === START) {

    track.visible = false;
    car1.visible = false;
    coinsGroup.visible= false;
    text.visible = true;
    

    noStroke();
    textSize(35)
    fill("black");
    text("Name : ", 120, 20);
    //button1 = createButton("start");
    button1.position(width / 2, height / 2);
    button1.mousePressed(changeState);

    


    // console.log("in Start: " + gameState);

  }

  if (gameState === PLAY) {


    track.visible = true;
    car1.visible = true;
    button1.hide();

    if (track.y > height) {
      track.y = height / 2;
    }

    if (keyDown("LEFT_ARROW")) {
      car1.x = car1.x - 5;

    }

    if (keyDown("RIGHT_ARROW")) {
      car1.x = car1.x + 5;

    }

    camera.position.y = car1.y;

    spawnCars();
    addCoins();

    //  if (coinsGroup.isTouching(car1)) {

    // coinsGroup.visible = false;

    for (var i = 0; i < coinsGroup.length; i++) {
      var coin = coinsGroup.get(i);

      if (car1.isTouching(coin)) {
        coin.destroy();

        score = score + 50;
      }
    }


    //  }

    if (car1.isTouching(carsGroup)) {
      gameState = START;
    }


  }

  drawSprites();

  noStroke();
  textSize(35)
  fill("white");
  text("Score: " + score, width / 2, height / 2);
}

function addCoins() {
  if (frameCount % 60 === 0) {
    coin = createSprite(random(width / 2 - 200, width / 2 + 200), 100)
    coin.addImage(coinImg);
    coin.velocityY = 4;
    coin.scale = 0.1;

    coinsGroup.add(coin);
  }
}

function spawnCars() {
  if (frameCount % 90 === 0) {
    car2 = createSprite(random(width / 2 - 200, width / 2 + 200), 100);

    car2.velocityY = 4;

    var rand = Math.round(random(2, 5));
    //console.log(rand);

    switch (rand) {

      case 2: car2.addImage(car2Img);
        car2.scale = 0.5;
        break;
      case 3: car2.addImage(car3Img)
        car2.scale = 0.2;
        break;
      case 4: car2.addImage(car4Img)
        car2.scale = 0.7;
        break;
      case 5: car2.addImage(car5Img)
        car2.scale = 0.3;
        break;
      default: break;

    }

    carsGroup.add(car2)

  }
}

function changeState() {
  gameState = PLAY;
  //console.log("In ChageState: " + gameState);
}
