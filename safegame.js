const buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).on("keydown", function (e) {
  if ((e.key === " " || e.keyCode === 32) && !started) {
    e.preventDefault();
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$('[type="button"]').on("click", function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
  const audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

function animatePress(color) {
  $(`#${color}`).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentIndex) {
  if (userClickedPattern[currentIndex] !== gamePattern[currentIndex]) {
    gameOver();
    return;
  }

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  setTimeout(() => {
    playSound(randomColor);
    animatePress(randomColor);
  }, 500);
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => $("body").removeClass("game-over"), 200);
  $("#level-title").text("Game Over, Press Space to Restart");
  resetGame();
}

function resetGame() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
