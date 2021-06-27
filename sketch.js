var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var ground, groundimage;
var trex, trex_running;
var ground1, groundimage
var cloud, cloudI
var stop, stop1
var stop2
var stop3
var stop4
var stop5
var stop6
var score = 0
var obstaclegroup
var cloudgroup
var gameover, gameoverimg
var restart, restartimg
var chapntsound,jumpsound,diesound;

function preload() {
  trex_running =
    loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimage = loadImage("ground2.png")
  cloud = loadImage("cloud.png")
  stop1 = loadImage("obstacle1.png")
  stop2 = loadImage("obstacle2.png")
  stop3 = loadImage("obstacle3.png")
  stop4 = loadImage("obstacle4.png")
  stop5 = loadImage("obstacle5.png")
  stop6 = loadImage("obstacle6.png")
  gameoverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png")
cheakpointsound=loadSound("chapnt.mp3")
jumpsound=loadSound("jump.mp3")
diesound=loadSound("die.mp3")
}

function setup() {
  createCanvas(600, 200)
  createCanvas(displayWidth,displayHeight);
  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.debug = false
  trex.velocityX=3
  ground1 = createSprite(300, 185, 2000, 4)
  ground1.visible = false

  ground = createSprite(600, 180, 900, 19)
  ground.addImage("ground", groundimage)
  ground.x = ground.width / 2
ground.scale=2
  ground.velocityX = -3

  cloudgroup = new Group()
  obstaclesgroup = new Group()
  gameOver = createSprite(300, 100, 20, 20)
  gameOver.addImage(gameoverimg)
  gameOver.scale = 0.5
  gameOver.visible = false
  restart = createSprite(300, 130, 20, 20)
  restart.addImage(restartimg)
  restart.scale = 0.5
  restart.visible = false
  trex.setCollider("rectangle", 0,0,150,100)
  
  //var name="harsimran"
  
}

function draw() {
  background("white")
  //console.log(name)
trex.collide(ground1)
// console.log (trex.y)
  drawSprites();
 text("score=" + score, 230, 65)

  if (gamestate === PLAY) {
    if (keyDown("space")) {
      trex.velocityY = -10
      jumpsound.play()
    }
    camera.position.x=trex.x
        camera.position.y=100
    trex.velocityY = trex.velocityY + 0.5
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    ground.velocityX=-(4+3*score/100)
    createcloud()
    createstop()
    score =score+Math.round(getFrameRate() / 6)
    if(score%100===0)
      {cheakpointsound.play()
  
        
      }
    if (obstaclesgroup.isTouching(trex)) {
      gamestate = END
       diesound.play()
      //trex.velocityY=-5


      
    }
  } else if (gamestate === END) {
    ground.velocityX = 0
    obstaclesgroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    trex.velocityY = 0
    trex.velocityX=0
    obstaclesgroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1)
    restart.visible = true
    gameOver.visible = true
  }
  if(mousePressedOver(restart)){
    reset()
  }
}

function createcloud() {
  if (frameCount % 60 === 0) {
    cloudI = createSprite(width, random(30, 140), 40, 50)
    cloudI.velocityX = -3
    cloudI.addImage("cloud.png", cloud)
    console.log(Math.round(random(50, 260)))
    trex.depth = cloudI.depth + 1
    cloudgroup.add(cloudI)
    cloudI.lifetime = 200
    cloudI.scale = 0.7
  }


}

function createstop() {
  if (frameCount % 80 === 0) {
    stopI = createSprite(600, 165, 30, 78)

    stopI.velocityX = -(3+score/100)
    //console.log(Math.round(random(43,53)))

    var r = Math.round(random(1, 6))
    switch (r) {
      case 1:
        stopI.addImage("obstacle1", stop1);
        break
      case 2:
        stopI.addImage("obstacle2", stop2);
        break
      case 3:
        stopI.addImage("obstacle3", stop3)
        break
      case 4:
        stopI.addImage("obstacle4", stop4)
        break
      case 5:
        stopI.addImage("obstacle5", stop5)
        break
      case 6:
        stopI.addImage("obstacle6", stop6)
        break
    }
    stopI.scale = 0.5
    stopI.lifetime = 200

    obstaclesgroup.add(stopI)
  }
}
  function reset(){
    gamestate=PLAY
    obstaclesgroup.destroyEach()
    cloudgroup.destroyEach()
    restart.visible=false
    gameOver.visible=false
    score=0
  }













  