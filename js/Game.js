class Game {
  constructor(){
 
  }
 
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
 
  }
 
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
 
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
 
    swimmer1 = createSprite(10,200,50,50);
    swimmer1.addImage("swimmer1",swimmer1_img);
    swimmer2 = createSprite(300,200,50,50);
    swimmer2.addImage("swimmer2",swimmer2_img);
    swimmer3 = createSprite(600,200,50,50);
    swimmer3.addImage("swimmer3",swimmer3_img);
    swimmer4 = createSprite(900,200,50,50);
    swimmer4.addImage("swimmer4",swimmer4_img);
    swimmers = [swimmer1,swimmer2, swimmer3,swimmer4];
  }
 
  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getSwimmersAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(swimming, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;
 
      //x and y position of the swimmers
      var x = 200 ;
      var y;
 
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
 
        
        x = x + 200;
        
        y = displayHeight - allPlayers[plr].distance;
        swimmers[index-1].x = x;
       swimmers[index-1].y = y;
       // console.log(index, player.index)
 
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          swimmers[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = swimmers[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
 
    }
 
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
 
    if(player.distance > 4200){
      gameState = 2;
      player.rank+=1;
      Player.updateSwimmersAtEnd(player.rank);
    }
   
    drawSprites();
  }
 
  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
 

