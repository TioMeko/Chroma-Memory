const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

function nextSequence() {
    userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#level-title").text(`Level ${level}`);

  $("#" + randomChosenColor)
    .fadeOut(50)
    .fadeIn(50);

  playSound(randomChosenColor);

  level++;
}

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
  let audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  let animation = $(`#${currentColor}`).addClass("pressed");

  setTimeout(function () {
    animation.removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

function checkAnswer(indexPressed) {
  if (userClickedPattern[indexPressed] == gamePattern[indexPressed]) {
    let count = 0;

    for (let i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] === userClickedPattern[i]) {
            count++;
        }

        if (count == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } 
    }
  }else {
    let audio = new Audio('./sounds/wrong.mp3')
    audio.play();

    $("#level-title").text(`Game Over, Press Any Key to Restart`);

    let gameOver = $('body').addClass('game-over');

    setTimeout(function(){
        gameOver.removeClass('game-over');
    }, 200)

    startOver();
  }
}

function startOver() {
    gameStarted = false;
    level = 0;
    gamePattern = [];
}