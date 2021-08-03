var dog,sadDog,happyDog;
var foodobj,foodStock;
var fedTime, lastFed,addFood,feed,feedDog;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
 database=firebase.database;
  createCanvas(1000,400);

  foodobj=new food();


  foodStock=database.ref('food');
  foodStock.on("value,readStock")

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed= createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addfoods);


}

function draw() {
  background(46,139,87);
 
 foodobj.display();

 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });

 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("lastFed : "+ lastFed%12 + " PM",350,30);
}
else if(lastFed===0){
text("lastfed : 12 AM",350,30);
}
else{
  text("Last Feed : "+ lastFed + " AM",350,30);
}

 
  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodobj.getFoodStock()<= 0){
    foodobj.updateFoodStock(foodObj.getFoodStock()*0);
  }
else{
  foodobj.updateFoodStock(Foodobj.getFoodStock()-1);
}
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}