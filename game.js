var gamepattern = [];
var buttoncolor = ["red", "green", "blue", "yellow"];

var userClickedPattern = [];

let level = 1;
let gameison = false;
let gameActive = true;
const wrongSound = new Audio("./sounds/wrong.mp3");
//gamepattern.push(buttoncolor[nextSq()]);

$('[type="button"]').on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  var audio = new Audio(`./sounds/${userChosenColour}.mp3`);
  audio.play();
  $(this).fadeOut(100).fadeIn(10);
  nextLevel();
});

function nextSq() {
  return Math.floor(Math.random() * 4);
}

function startGame() {
  if (!gameison) {
    $("#level-title").text(`Level ${level}`);
    var color = buttoncolor[nextSq()];
    gamepattern.push(color);
    playsound(color);
    gameison = true;
    //nextLevel();
  }
}

$(document).on("keydown", function (e) {
  if (e.key === " " || e.keyCode === 32) {
    e.preventDefault();
    startGame();
  }
});

$(document).on("touchstart", function () {
  setTimeout(()=>{
    startGame();  
  },1000);
  
});

// $(document).on("keydown", function (e) {
//   if ((e.key === " " || e.keyCode === 32 || e.keyCode) && !gameison) {
//     e.preventDefault();
//     $("#level-title").text(`Level ${level}`);
//     var color = buttoncolor[nextSq()];
//     gamepattern.push(color);
//     playsound(color);
//     gameison = true;
//     //nextLevel();
//   }
// });

function playsound(color) {
  if (gameActive) {
    var audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
    $(`#${color}`).fadeOut(100).fadeIn(10);
  }
}

async function nextLevel() {
  //if (userClickedPattern.length !== gamepattern.length) return;
  userClickedPattern.forEach((item, index) => {
    if (item != gamepattern[index]) {
      gameover();
      return;
    }
  });
  if (userClickedPattern.length === gamepattern.length) {
    setTimeout(() => {
      nextPattern();
      nextButton();
    }, 1500);
  }
}

function gameover() {
  gameActive = false;
  wrongSound.play();
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Space to Restart");
  setTimeout(() => $("body").removeClass("game-over"), 1000);
  setTimeout(()=>{
  location.reload();  
  },1500);
  
}

function nextButton() {
  for (let i = 0; i < gamepattern.length; ++i) {
    setTimeout(() => {
      if (gameActive) playsound(gamepattern[i]);
    }, i * 1000);
  }
  ++level;
  $("#level-title").text(`Level ${level}`);
  userClickedPattern = [];
}

function nextPattern() {
  var color = buttoncolor[nextSq()];
  gamepattern.push(color);
}

function resetGame() {
  gamepattern = [];
  userClickedPattern = [];
  level = 0;
  gameison = false;
  gameActive = true;
}
