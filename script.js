var dino = document.querySelector(".dino");
var gameOver = document.querySelector(".gameOver");
var obstacle = document.querySelector(".obstacle");
var playGame = document.getElementById("button");
var newScore = document.getElementById("score");
var playButton = document.getElementById("button2");
var start = document.querySelector(".initial");
var display = document.querySelector(".gameContainer");
var offsetX;
var offsetY;
var audio = new Audio("Game_Music.mp3");
var over = new Audio("Game_Over.wav");
var on_off = document.getElementById("speaker");

var im = 2;
score = 0;
cross = true;
audio.play();


playButton.addEventListener("click", run);

document.onkeydown = keyboard;
interval();

function reset() {
  obstacle.classList.add("obstacleAni");
  gameOver.innerHTML = "";
  playGame.style.visibility = "hidden";
  obstacle.style.display = "block";
  score = 0;
  dino.style.display = "block"
  scoreCont.innerHTML = "Your Score: " + score;
  cross = true;
  newScore.style.visibility = "hidden";
  scoreCont.style.visibility = "visible";
  obstacle.style.animationDuration = 10 + "s";
  interval();
}
function interval() {
  on_off.addEventListener("click", changeImage);
  
  setInterval(() => {
    values();

    if (offsetX < 73 && offsetY < 52) {

      audio.pause();
      setTimeout(() => {
        over.play();
      }, 20);
      gameOver.innerHTML = "Game Over !!!!";

      obstacle.classList.remove("obstacleAni");
      playGame.style.visibility = "visible";
      playGame.addEventListener("click", reset);
      obstacle.style.display = "none";
      dino.style.display = "none";
      newScore.innerHTML = "Your Score is  " + (score - 1);
      newScore.style.visibility = "visible";
      scoreCont.style.visibility = "hidden";
     } 
      else if (offsetX < 145 && cross) {
      score += 1;
      updateScore(score);
      cross = false;
      setTimeout(() => {
        cross = true;
      }, 2000);

      setTimeout(() => {
        aniDur = parseFloat(
          window
            .getComputedStyle(obstacle, null)
            .getPropertyValue("animation-duration")
        );

        if (aniDur >= 5) {
          newDur = aniDur - 0.1;
          obstacle.style.animationDuration = newDur + "s";
          console.log("New animation duration: ", newDur);
        }
      }, 1000);
    }
  }, 20);
}
function changeImage() {

  if (im === 2) {
    im = 1;
    console.log("hello");
    on_off.src = "off.png";
    audio.pause();
    audio.currentTime = 0;
  } 
  
  else 
  {
    im = 2;
    console.log("bye");
    on_off.src = "s.png";
    audio.play();
  }
}

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}

function run() {
  if (start.style.display === "block") {
    start.style.display = "none";
    display.style.display = "block";
  } else {
    start.style.display = "block";
    display.style.display = "none";
  }
  
}

function values() {
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
}


function keyboard(e) {
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


