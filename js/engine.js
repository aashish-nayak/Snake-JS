// Game Constants And Variables

let box = 20;
let food = {
  x: 4,
  y: 6,
};
let speed = 5;
let lastframe = 0;
let snake = Array({
  x: 11,
  y: 10,
});
let dir = {
  x: 0,
  y: 0,
};
let snakedir;
let score = 0;
let Hscore = 0;
const keyclick = new Audio("./sound/click.wav");
const music = new Audio("./sound/music.mp3");
const gameover = new Audio("./sound/game-over.wav");
const foodsound = new Audio("./sound/food.wav");

$("input[name='speed']").on("change", function () {
  if ($("input[name='speed']").is(":checked")) {
    speed = $(this).val();
  }
});

function createBox(boxes) {
  for (let i = 1; i <= boxes; i++) {
    $("#box").append("<tr class='line' id='" + i + "'></tr>");
    for (let j = 1; j <= boxes; j++) {
      $("#" + i).append("<td id='" + i + "-" + j + "'></td>");
    }
  }
}
createBox(box);

$(document).on("swipe", function (e) {
  //   console.log(e);
});

function main(cframe) {
  $("#staticBackdrop").removeAttr("style");
  $("#change").removeClass("fa-play");
  $("#change").addClass("fa-redo");
  frame = requestAnimationFrame(main);
  // console.log(cframe);
  if ((cframe - lastframe) / 1000 < 1 / speed) {
    return;
  }
  lastframe = cframe;
  gameEngine();
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isCollapse(snakearr) {
  for (let j = 1; j < snake.length; j++) {
    if (snakearr[j].x === snakearr[0].x && snakearr[j].y === snakearr[0].y) {
      return true;
    }
  }
}

function gameEngine() {
  // console.log("X : "+snake[0].x+" Y : "+snake[0].y);
  music.play();
  music.volume = 0.5;
  // Updateing Snake and Food
  if (localStorage.getItem("HighScore") == null) {
    localStorage.setItem("HighScore", Hscore);
  }
  if (isCollapse(snake)) {
    gameover.play();
    dir = {
      x: 0,
      y: 0,
    };
    snake = [
      {
        x: 11,
        y: 10,
      },
    ];
    cancelAnimationFrame(frame);
    $("#staticBackdrop").attr("style", "display:block");

    if (score > localStorage.getItem("HighScore")) {
      localStorage.setItem("HighScore", score);
    }
    score = 0;
    music.pause();
  }
  //   snake[0].x > 20 || snake[0].x < 1 || snake[0].y < 1 || snake[0].y > 20
  if (snake[0].x > 20) {
    snake[0].x = 1;
  }
  if (snake[0].x < 1) {
    snake[0].x = 20;
  }
  if (snake[0].y > 20) {
    snake[0].y = 1;
  }
  if (snake[0].y < 1) {
    snake[0].y = 20;
  }

  if (snake[0].x == food.x && snake[0].y == food.y) {
    snake.unshift({
      x: snake[0].x + dir.x,
      y: snake[0].y + dir.y,
    });
    $("#" + food.x + "-" + food.y).removeClass("food");
    food = {
      x: random(1, box),
      y: random(1, box),
    };
    score += 10;
    foodsound.play();
    foodsound.currentTime = 0;
  }

  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = {
      ...snake[i],
    };
    $("#" + snake[i + 1].x + "-" + snake[i + 1].y).removeClass(
      "snake-body snake-head"
    );
  }

  snake[0].x += dir.x;
  snake[0].y += dir.y;
  //   console.log(snake[0].x);
  // console.log(dir.x);

  // Placements of Food and Snake
  if ($("#box > tr > td").hasClass("snake-body") == true) {
    $("#box").find(".snake-body").removeClass("snake-body");
    $("#box").find(".snake-head").removeClass("snake-head");
  }

  snake.forEach((e, index) => {
    // console.log(e.y)
    if (index == 0) {
      $("#" + e.x + "-" + e.y).addClass("snake-body snake-head");
    } else {
      $("#" + e.x + "-" + e.y).addClass("snake-body");
    }
  });
  $("#" + food.x + "-" + food.y).addClass("food");
  $("#score").html("Score : " + score);
  $("#H-score").html("Highest Score : " + localStorage.getItem("HighScore"));
}

$(document).keydown(keylogger);
function keylogger(event) {
  dir = {
    x: 0,
    y: 0,
  };
  keyclick.play();
  keyclick.currentTime = 0;
  if(event===38){
    if (snakedir != "sdown") {
      snakedir = "sup";
      dir.x = -1;
      dir.y = 0;
    }else{
      snakedir = "sdown";
      dir.x = +1;
      dir.y = 0;
    }
  }
  
  if(event===40){
    if (snakedir != "sup") {
      snakedir = "sdown";
      dir.x = +1;
      dir.y = 0;
    }else{
      snakedir = "sup";
      dir.x = -1;
      dir.y = 0;
    }
  }
  
  if(event===37){
    if (snakedir != "sright") {
      snakedir = "sleft";
      dir.x = 0;
      dir.y = -1;
    }else{
      snakedir = "sright";
      dir.x = 0;
      dir.y = +1;
    }
  }
  
  if(event===39){
    if (snakedir != "sleft") {
      snakedir = "sright";
      dir.x = 0;
      dir.y = +1;
    }else{
      snakedir = "sleft";
      dir.x = 0;
      dir.y = -1;
    }
  }
  

  switch (event.key) {
    case "ArrowUp":
      if (snakedir != "sdown") {
        snakedir = "sup";
        dir.x = -1;
        dir.y = 0;
        break;
      }else{
        snakedir = "sdown";
        dir.x = +1;
        dir.y = 0;
        break;
      }
    case "ArrowDown":
      if (snakedir != "sup") {
        snakedir = "sdown";
        dir.x = +1;
        dir.y = 0;
        break;
      }else{
        snakedir = "sup";
        dir.x = -1;
        dir.y = 0;
        break;
      }
    case "ArrowLeft":
      if (snakedir != "sright") {
        snakedir = "sleft";
        dir.x = 0;
        dir.y = -1;
        break;
      }else{
        snakedir = "sright";
        dir.x = 0;
        dir.y = +1;
        break;
      }
    case "ArrowRight":
      if (snakedir != "sleft") {
        snakedir = "sright";
        dir.x = 0;
        dir.y = +1;
        break;
      }else{
        snakedir = "sleft";
        dir.x = 0;
        dir.y = -1;
        break;
      }
    case " ":
      requestAnimationFrame(main);
      break;
    case "p":
      cancelAnimationFrame(frame);
      break;
    default:
      break;
  }
}


var elem = document.getElementById("full-body");
/* View in fullscreen */
function openFullscreen() {
  $("#screen").attr("onclick", "closeFullscreen()");
  $("#screenText").text("Exit");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  $("#screen").attr("onclick", "openFullscreen()");
  $("#screenText").text("Full Screen");
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}
