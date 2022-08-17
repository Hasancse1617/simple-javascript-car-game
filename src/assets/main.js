const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

startScreen.addEventListener("click", start);
let player = {speed : 5, score: 0};

let keys = {ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false};

document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function start(){
    startScreen.classList.add("hide");//hide Start Screen

    gameArea.innerHTML = "";//Remove all elements after new start
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    
    for (let i = 0; i < 5; i++) {   //append dynamic road line in road
        let roadLine = document.createElement("div");
        roadLine.setAttribute("class", "lines");
        roadLine.y = (i * 150);
        // console.dir(roadLine);
        roadLine.style.top = roadLine.y +"px";
        gameArea.appendChild(roadLine);
    }
    //create Car
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // console.log(player);

    //Create Enemy Car
    for (let i = 0; i < 3; i++) {
        let enemyCar = document.createElement("div");
        enemyCar.setAttribute("class", `enemy enemy-${i+1}`);
        enemyCar.y = ((i+1)*350)* -1;
        // console.dir(enemyCar);
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}
function gamePlay(){
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if(player.start){
        moveLines();
        moveEnemies(car);
        //Car move with Arrow key
        if(keys.ArrowUp && player.y > (road.top + 70)){ player.y -= player.speed};
        if(keys.ArrowDown && player.y < (road.bottom - 70)){ player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed};
        if(keys.ArrowRight && player.x < (road.width - 50)){ player.x += player.speed};
        
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        
        window.requestAnimationFrame(gamePlay);
        player.score++;
   	 	let ps = player.score - 1;
   	 	score.innerText = "Score : "+ ps;
    }
}
function moveLines(){
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function(item){
        // console.log(item, item.y);
        if(item.y >= 700){ item.y -= 750; }
        item.y += player.speed
        // console.log(item.y);
        item.style.top = item.y + "px";
    });
}
function moveEnemies(car){
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach(function(item){
        if(isCollide(car, item)){
            // console.log(isCollide(car,item));
            endGame();
        }
        if(item.y >= 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}
function isCollide(a, b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    // console.log(aRect, bRect);
    return (aRect.x < bRect.x + bRect.width && aRect.x + aRect.width > bRect.x && aRect.y < bRect.y + bRect.height && aRect.height + aRect.y > bRect.y);
}

function endGame(){
    player.start = false;
    startScreen.classList.remove("hide");
    startScreen.innerHTML = "Game Over </br> Your final score is " + player.score + "</br>Press here to restart the Game";
}