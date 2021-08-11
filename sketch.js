var PLAY = 0;
var END = 1;
var gameState = PLAY;

var score = 0;
var score;
//var score1,score2;
var monkey , monkey_running, monkey_running2;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var Ground,GroundImage;
var Line;
var restart,restartimg;


function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_running2 = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  GroundImage = loadImage("background.png");
  restartimg = loadImage("restart.png");
  
}



function setup() {
    
   createCanvas(400,400)
  
   Ground = createSprite(200,200,400,400)
   Ground.addImage(GroundImage)
   Ground.x = Ground.width/2;
   Ground.velocityX = -4
   Ground.scale = 1
   
   monkey = createSprite(100,300)
   monkey.addAnimation("running",monkey_running)
   monkey.scale = 0.1;
   
   Line = createSprite(200,335,400,10);
   Line.visible = false;
   
   restart = createSprite(200,200)
   restart.addImage(restartimg);
   restart.visible = false;
  
  
   foodGroup = createGroup();
   obstacleGroup = createGroup();

  
}


function draw() {
  
  
  background("black")
  if(gameState === PLAY){

      if(keyDown("space") && monkey.y >= 280) {
              monkey.velocityY = -13;
    }
    console.log(monkey.y)
      monkey.velocityY = monkey.velocityY + 0.8
      restart.visible = false;
      Ground.velocityX = -4

      createBanana();
      createObstacle();
    
      if(obstacleGroup.isTouching(monkey)){
        console.log("End");
        monkey.velocityY = 0;
        
        gameState = END;
      }
  }
   
  if(gameState === END){
           monkey.addAnimation("running",monkey_running2)
           Ground.velocityX = 0;
           restart.visible = true;
             if(mousePressedOver(restart)){
                   gameState = PLAY;
                   monkey.addAnimation("running",monkey_running);                                          
                  score = 0
             }
  }
   if (Ground.x < 0){
       Ground.x = Ground.width/2;
   }
        monkey.collide(Line);
  
  if(monkey.isTouching(foodGroup)){
   score += 1;
   foodGroup.destroyEach();
   
  }
  
  
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,40);
  
} 

function createBanana(){
      if (frameCount % 60 === 0) {
         var banana = createSprite(420, 260, 10,10);
             banana.addImage(bananaImage);
             banana.y = Math.round(random(150,200));
             banana.velocityX = -5;
             banana.scale = 0.1;
             banana.lifetime = 300;
             foodGroup.add(banana)
  
    }
}

function createObstacle(){
  if (frameCount % 90 === 0) {
     var obstacle = createSprite(420, 150, 10,10);
     obstacle.addImage(obstacleImage);
     obstacle.y = Math.round(random(292,330));
     obstacle.velocityX = -5;
     obstacle.scale = 0.1;
     obstacle.lifetime = 300;
     obstacleGroup.add(obstacle)

  }
}

/*function createObstacle2(){
    if (frameCount % 90 === 0) {
        var obstacle = createSprite(420,150,20,20);
            obstacle.y = Math.round(random(292,292));
            obstacle.addImage(obstacleImage);
            obstacle.velocityX = -6;
            obstacle.scale = 0.1     ;
            obstacle.lifetime = 300;
            obstacleGroup.add(obstacle);
    }
}
*/


