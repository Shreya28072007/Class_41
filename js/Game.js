class Game{
    constructor(){

    }
getState(){
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value",function(data){
    gameState = data.val()
})
}
update(state){
    database.ref("/").update({
        gameState:state
    })
}

async start(){
    if(gameState === 0){
        player = new Player();
        var playerCountRef =  await database.ref("playerCount").once("value")
        if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
        }
       
        form = new Form();
        form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1,car2,car3,car4];

}
play(){
    form.hide();
    player.getCarsAtEnd();
    textSize(30);
    text("Game Start",120,100);
    Player.getPlayerInfo();
    if(all_players !== undefined){
        background(ground_img);

        image(track_img,0,-displayHeight*4,displayWidth,displayHeight*5);
        //var display_position = 130;
        //index of the array
        var index = 0;
        //x and y position of the cars
        var x=175;
        var y;
        for(var plr in all_players){
            //add 1 to the index for every loop
            index = index+1;
            x +=200;
            y = displayHeight - all_players[plr].distance;
            cars[index-1].x = x;
            cars[index-1].y = y;

            if(index===player.index){
                fill("red");
                stroke(10);
                ellipse(x,y,60,60);
                cars[index-1].shapeColor="red";
                camera.position.x = displayWidth/2;
                camera.position.y = cars[index-1].y;
            }
            
        
    
        
    //    display_position += 20;
     //   text(all_players[plr].name+": "+all_players[plr].distance,120,display_position);
        }
}
if(keyIsDown(UP_ARROW) && player.index !== null){
    player.distance +=50;
    player.update();
}
if(player.distance > 3860){
    gameState = 2;
    //game.update(2);
    player.rank += 1;
    Player.updateCarsAtEnd(player.rank);
}
drawSprites();
}
end(){
    console.log("Game End");
   
    console.log(player.rank);
}
}