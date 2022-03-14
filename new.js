score = 0;
cross = true;
dino = document.querySelector(".dino");

playButton = document.getElementById("button2");
playButton.addEventListener("click", run);
function run() {
  document.querySelector(".initial").style.display = "none";
  document.querySelector(".gameContainer").style.display = "block";
}
game();

function game(){
    document.onkeydown = function (e) {
        if (e.keyCode == 38) {
          dino.classList.add("animateDino");
          setTimeout(() => {
            dino.classList.remove("animateDino");
          }, 700);
        }
      
        if (e.keyCode == 39) {
          dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
          dino.style.left = dx + 112 + "px";
        }
      
        if (e.keyCode == 37) {
          dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
          dino.style.left = dx - 112 + "px";
        }
      }
}

setInterval(() => {
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");
  dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));
  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);
  
  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerHTML = "Game Over !!!!";
    obstacle.classList.remove("obstacleAni");
    playGame = document.getElementById("button");
    playGame.style.visibility = "visible";
    document.getElementById("score").innerHTML = "Your Score is  " + score;
    document.getElementById("score").style.visibility = "visible";
    scoreCont.style.visibility = "hidden";
    console.log(offsetX, offsetY);
    


    // audiogo.play();
    // setTimeout(() => {
    //   audiogo.pause();
    //   audio.pause();
    // }, 1000);
  } 
  
  else if (offsetX < 145 && cross)
  {
    score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
          cross = true;
        }, 2000);
        setTimeout(() => {
          aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
          if(aniDur >= 5 )
          {
            newDur = aniDur - 1;
            obstacle.style.animationDuration = newDur + "s";
            console.log("New animation duration: ", newDur);
          }
        }, 1000);

    
  }
}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}
