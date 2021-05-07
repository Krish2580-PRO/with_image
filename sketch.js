var monkey, monkey_running
var banana, bananaImage, bananaGroup
var obstacle, obstacleImage, obstacleGroup
var gameState = 'play'
var survival_Time = 0
var ground, invisibleGround

var a = 80

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  forestImage = loadImage("Forest.jpg")
}

function setup() {
  //The background
  createCanvas(600, 600)

  //The monkey
  monkey = createSprite(80, 345, 10, 10)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2
  //monkey.debug = true

  //The ground
  ground = createSprite(300, 400, 900, 10)
  ground.x = ground.width / 2
  ground.shapeColor = 'rgb(139,69,19)'
  ground.scale = 2

  //invisible ground
  invisibleGround = createSprite(300, 400, 900, 10);
  invisibleGround.visible = false

  //Groups
  bananaGroup = new Group()
  obstacleGroup = new Group()
  
}

function draw() {
  monkey.collide(invisibleGround)
  background(forestImage)
  drawSprites()

  //text(mouseX + "," + mouseY, mouseX, mouseY)

  stroke("black")
  textSize(20)
  fill("black")
  textFont("Centaur")
  text("Survival Time = " + survival_Time, 240, 100)

  a = a + 10
  camera.position.a = displayHeight/2;

  //console.log(ground.x)

  if (gameState == 'play') {
    obstacles()
    bananas()
    //score
    survival_Time = survival_Time + round(getFrameRate() / 60)
    
  if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach()
      survival_Time = survival_Time + 2
    }

  if (monkey.isTouching(obstacleGroup)) {
      gameState = 'end'
    }

  if (keyDown('space') && monkey.y >= 300) {
      monkey.velocityY = -14
    }
    
    monkey.velocityY = monkey.velocityY + 0.6
    stroke("white")
    textSize(24)
    fill("red")
    text("Score increases as the game continues", 160, 450)
    fill("blue")
    text("Score also increases by 2 when you touch a banana", 100, 480)
  }

  if (gameState == 'end') {
    obstacleGroup.setLifetimeEach(-1)
    bananaGroup.setLifetimeEach(-1)

    ground.velocityX = 0
    obstacleGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    monkey.velocityY = monkey.velocityY + 0.6
    monkey.pause()
    stroke("white")
    fill("red")
    textSize(32)
    text("Game Over", 200, 220)

    fill("skyblue")
    textSize(32)
    text("Better luck next Time", 140, 460)
  }
}

function bananas() {
  if (frameCount % 80 == 0) {
    banana = createSprite(500, 200, 40, 40)
    banana.addImage(bananaImage)
    banana.scale = 0.2
    banana.lifetime = 150
    banana.velocityX = -8
    banana.y = random(120, 200)

    bananaGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function obstacles() {
  if (frameCount % 300 == 0) {
    obstacle = createSprite(500, 360, 40, 40)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2
    obstacle.lifetime = 150
    obstacle.velocityX = -12
    obstacleGroup.add(obstacle)

  }
}