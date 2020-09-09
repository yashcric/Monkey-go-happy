var bananaImage,banana,foodGroup;
var obstacle,obstacleImage,ObstaclesGroup
var background1, backgroundImage;
var score, player_running,person,ground;
var scaleRate;
var life;
function preload(){
 backgroundImage=loadImage("jungle.jpg");
  
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_3.png","Monkey_4.png","Monkey_05.png","Monkey_6.png","Monkey_7.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  background1 = createSprite(200,200,400,400);
  background1.addImage(backgroundImage);
  
 life = 2;
  banana = createSprite(200,300,20,20);
  banana.addImage(bananaImage);
  obstacle.addImage(obstacleImage);
  
  obstacle = createSprite(200,300,20,20);
  obstacle.addImage(obstacleImage);
  
  person = createSprite(10,380,20,20);
  person.loadImage(player_running);
  
   ground = createSprite(200,390,400,20);
  
  foodGroup = new Group();
  ObstaclesGroup = new Group();
}

function draw() {
  background(220);
  
  textSize(20);
  text("Survival Time:"+score,240,50);
  background.scale = 2;
  ground.visible = false;
   
  if(life===0){
    ground.velocityX = 0;
    background1.velocityX = 0;
     person.velocityY = 0;
     ObstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     ObstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1); 
  }
    background1.velocityX = -1;
    if(background1.x === 0){
      background1.x = 200;
    }
   score=score + Math.round (World.frameRate/60) ;
  person.velocityY=person.velocityY+0.6;
  person.collide(ground); 
  
  ground.velocityX = -1;
  ground.scale = 2;
  if(ground.x ==0){
    ground.x =200; 
  }
  if(keyDown("space")&&person.y === 321){
    person.velocityY-=12;
  }
  
  spawnObstacles();
  spawnReward();
   if(ObstaclesGroup.isTouching(person)){
     person.scale = person.scale- 0.2*scaleRate;
     life = life-1;
   }
  
     if(foodGroup.isTouching(person)){
     person.scale = person.scale+ 0.2;
       scaleRate++;
   }
  
  
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    
    obstacle.velocityX = - 5 ;
  obstacle.setCollider("circle",0,0,80);
    //generate random obstacles
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 80;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
function spawnReward(){
  if(World.frameCount%80 === 0){
   

    var bananaY = Math.round(random(200,150));
    banana.y = bananaY;

    
    
    banana.velocityX = -4;
    banana.lifetime = 100;
    banana.scale = 0.3;
    foodGroup.add(banana);
  }
}