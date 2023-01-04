//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;
var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwooshSound; //ajeitar a variavel com Sound no final <<<<<<

function preload(){  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3"); //carregar o som quando monstro <<<<<
  knifeSwooshSound = loadSound("knifeSwoosh.mp3"); //carregar o som quando fruta <<<<
}
function setup() {
  createCanvas(600, 600);
  //criar espada
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  //definir colisor para espada
  knife.setCollider("rectangle",0,0,40,40);
  // Variáveis de pontuação e grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
}

function draw() {
  background("lightblue");
  if(gameState===PLAY){
    //Chamar função de frutas e monstro
    fruits();
    Monster();
    // Mova a espada com o mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    // Aumenta a pontuação se a espada tocar na fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();//toca o som <<<<<<<<<<<<<<<<<<<<< adicionar
      score=score+2;//aumenta a pontuação <<<<<<<<<<<<<<<<<<<<<< adicionar
    }
    else
    {
      // Vá para o estado final se a espada tocar o inimigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        //som de fim do jogo \/\/\/\/\/\/
        gameOverSound.play(); //toca o som do fim de jogo <<<<<<<<<<<<<<<<<<<<<<<< adicionar
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Mude a animação da espada para gameover (fim de jogo) e redefina sua posição
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //Exibir pontuação
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10)); //altera a velocidade do monstro <<<<<<<<<<<<<<< alterar
    monster.setLifetime=50;
    monsterGroup.add(monster);
  }
function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
     //usar uma variável aleatória para mudar a posição da fruta e tornar mais desafiador
    if(position==1)
    {
    fruit.x=600;
    fruit.velocityX=-(7+(score/4)); //muda a velocidade <<<<<<<<<<<<<<<<<<<<<< alterar
    }
    else
    {
      if(position==2){
      fruit.x=0;
  //Aumente a velocidade da fruta após a pontuação 4
      fruit.velocityX= (7+(score/4)); // <<<<<<<<<<<<<<<<<<<<<<<<<<< alterar
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}