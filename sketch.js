var canvas, backgroundImage;
 
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
 
var form, player, game;
 
var swimming, swimmer1 ,swimmer2 ,swimmer3 , swimmer4, swimmers;
 
var  swimmer1_img , swimmer2_img , swimmer3_img , swimmer4_img;
 
function preload(){
  swimming = loadImage("images/swimming.jpg");
  swimmer1_img = loadImage("images/swimmer1.jpg");
  swimmer2_img = loadImage("images/swimmer2.jpg");
  swimmer3_img = loadImage("images/swimmer3.png");
  swimmer4_img = loadImage("images/swimmer4.jpg");
 
}
 
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}
 
 
function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}

