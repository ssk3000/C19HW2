var character, characterImg;
var spike, spikeImg, spikesGroup;
var floor, floorImg;
var gameState = "play";
var frameRateResetSpike;
var score;

function preload(){
    characterImg = loadImage("character.png");
    spikeImg = loadImage("spike.png");
    floorImg = loadImage("floor.png");
}

frameRateResetSpike = 80

function spawnObstacles() {
    if(frameCount % frameRateResetSpike == 0) {
        spike = createSprite(300,300);
        spike.addImage("spike", spikeImg);
        spike.velocityX = -2
        spike.x = 800
        spike.y = 180
        spike.scale = 0.2
        spike.lifetime = 900
        spikesGroup.add(spike)
        frameRateResetSpike = Math.round(random(100,200))
        console.log(frameRateResetSpike)
       
       character.depth += 2
    }
}

function setup() {
    createCanvas(800,200)

    floor = createSprite(200,50)
    floor.addImage("floor", floorImg)
    floor.velocityX = -2
    floor.y = 200
    floor.x = 800
    floor.scale = 2
    spikesGroup = createGroup()

    character = createSprite(300,300);
    character.addImage("character", characterImg)
    character.x = 50;
    character.y = 172;
    character.scale = 0.16
    character.setCollider("rectangle",0,0,character.width+50,character.height+50)
    character.debug = true;
    score = 0
}

function draw() {
    background(0,0,0)
    textSize(20)
    text("Score: " + score,680,20)
    if(gameState == "play") {
    spawnObstacles();
        if(keyDown("space") || keyDown("up")) {
            character.velocityY -= 3
            console.log(character.y)
            score += 1
        }
        if(character.velocityY < 100) {
             character.velocityY += 1
    }
    if(gameState == "play") {
        if(floor.x < 600){
            floor.x = 700
          }
        
        }
    if(spikesGroup.isTouching(character)){
        gameState = "end"
          
    } if(gameState == "end") {
        floor.velocityX = 0;
        spikesGroup.setVelocityXEach(0)
        spikesGroup.setLifetimeEach(-1)
    }
}
    
    character.collide(floor)
    drawSprites();
}
