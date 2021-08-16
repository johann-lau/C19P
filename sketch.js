var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
const difficulty = 10;
var dinterval = 400/difficulty;var dlifetime = 800/difficulty;
var cachex1, cachex2;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = difficulty;
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  ghost = createSprite(300,350,50,50);
  ghost.addImage(ghostImg);
  ghost.velocityY = 0;
  ghost.scale = 0.3; 
  edges = createEdgeSprites();
  setInterval(spookySound.play(), 20000);
  textFont('Arial');
  textSize(40);
  textAlign(CENTER, CENTER);
  fill("white");
}

function draw() {
  if (gameState == "play" || gameState == "willend") {
    background(200);
    if (tower.y > 599){
      tower.y = 0;
    }
    if (keyDown("space") && gameState == "play") {
      ghost.velocityY = -8;
    }
    if (ghost.isTouching(climbersGroup)) {
      ghost.y = climber.y - 60;
      cachex1 = climber.x - 30;
      cachex2 = climber.x + 50;
      console.log("cachex1: "+cachex1)
      console.log("cachex2: "+cachex2)
      gameState = "willend";
    }
    if (keyDown("left_arrow") && ((ghost.x > 120 && gameState == "play")||(ghost.x > cachex1 && gameState == "willend"))) {
      ghost.x = ghost.x - 8;
    }
    if (keyDown("right_arrow") && ((ghost.x < 480 && gameState == "play")||(ghost.x < cachex2 && gameState == "willend"))) {
      ghost.x = ghost.x + 8;
    }
    if (ghost.velocityY < 6*difficulty) {
      ghost.velocityY = ghost.velocityY + 0.5;
    }
    if (ghost.isTouching(edges[3])) {
      gameState = "ending";
    }
    if (gameState == "willend") {
      ghost.velocityY = difficulty;
    }
    ghost.collide(edges[2]);
    makedoor();
    drawSprites();
    console.log("ghost x: "+ghost.x)
  }
  if (gameState == "ending") {
    ghost.velocityY = 0;
    tower.velocityY = 0;
    doorsGroup.setVelocityEach(0,0);
    climbersGroup.setVelocityEach(0,0);
    text("Game Over", 300, 300);
    textSize(25);
    text("Press R or Space to reset the game", 300, 340)
    gameState = "ended";
  }
  if (gameState == "ended" && (keyDown("R") || keyDown("space"))) {
    background(200);
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    tower.velocityY = difficulty;
    ghost.x = 300;
    ghost.y = 350;
    ghost.velocityY = 0;
    textSize(40);
    gameState = "play";
  }
}

function makedoor() {
  if (frameCount%dinterval == 0) {
    doorPos = random(150,450);
    door = createSprite(doorPos,-100,50,50);
    door.velocityY = difficulty;
    door.addImage(doorImg);
    door.lifetime = dlifetime;
    doorsGroup.add(door);
    climber = createSprite(doorPos,-50,50,50);
    climber.velocityY = difficulty;
    climber.addImage(climberImg);
    climber.lifetime = dlifetime;
    climbersGroup.add(climber);
    ghost.depth = climber.depth + 1; 
  }
}

function playsound() {
  ;
}