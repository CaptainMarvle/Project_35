var balloon, balloonAnimation;
var backgroundImg;
var position,database;

function preload(){

  backgroundImg = loadImage("pro-C35Images/background.png")
  balloonAnimation = loadAnimation("pro-C35Images/balloon1.png","pro-C35Images/balloon2.png","pro-C35Images/balloon3.png")

}

function setup() {

  //database = firebase.database();
  

  createCanvas(1000,700);
  
  balloon = createSprite(100,400,50,50);
  balloon.shapeColor = "red";
  balloon.addAnimation("pro-C35Images/balloon1.png","pro-C35Images/balloon2.png","pro-C35Images/balloon3.png")

  // var balloon2 = database.ref('Balloon/position');
  // balloon2.on("value", readPosition, showError);

  database = firebase.database();

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);

}

function draw() {
  background(backgroundImg);
  
  
  if(position != undefined){

    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,1);
    }

}

  drawSprites();
}


 function changePosition(x,y){
   
 database.ref('balloon/position').set({

   'x': position.x + x,
   'y': position.y + y

  })
 }

function readPosition(data){
position = data.val();

balloon.x = position.x;
balloon.y = position.y;

}

// function updateHeight(x,y){

//   database.ref('balloon/position').set({

//    'x' : position.x + x ,
//    'y' : position.y + y 

//   })

// }

// function readHeight(data){

//    height = data.val();
//    balloon.x = position.x; 
//    balloon.y = position.y;

// }

function showError(){

console.log("please check your internet conection or code"); // errore in connection to detabase

}