var colors = ["green", "red", "yellow", "blue"];
var head = 0;
var records = [];
var started = false;
var userclicked = [];
var i = 0;
$("body").keypress(function() {
  console.log(started);
  if (!started) {
    head = 0;
    records = [];
    head++;
    i = 0;
    started = true;
    nextSequence(head);
  }
});

$(".btn").click(function(event) {
  console.log(event.target.id);
  var userclick = event.target.id;
  userclicked.push(userclick);
  playaudio(userclick);
  $("." + userclick).addClass("pressed");
  setTimeout(function() {
    $("." + userclick).removeClass("pressed");
  }, 200);
  var lastclick = userclicked.length - 1;
  if (userclicked[lastclick] == records[lastclick]) {
    if (userclicked.length == records.length) {
      head++;
      setTimeout(function() {
        nextSequence(head);
      }, 1000);
    }
  } else {
    document.querySelector("h1").innerHTML = "Game Over Please Press another key";
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    playaudio("out");
    records = [];
    userclicked = [];
    started = false;
    head = 0;
  }
});

function playaudio(color) {
  switch (color) {
    case 'green':
      var audio = new Audio('sounds/green.mp3');
      audio.play();
      break;
    case 'red':
      var audio = new Audio('sounds/red.mp3');
      audio.play();
      break;
    case 'yellow':
      var audio = new Audio('sounds/yellow.mp3');
      audio.play();
      break;
    case 'blue':
      var audio = new Audio('sounds/blue.mp3');
      audio.play();
      break;
    case 'out':
      var audio = new Audio('sounds/wrong.mp3');
      audio.play();
  }
}

function nextSequence(head) {
  userclicked = [];
  var randomclicks = Math.floor((Math.random() * 4));
  records.push(colors[randomclicks]);
  document.querySelector("h1").innerHTML = "Level " + head;
  $("." + colors[randomclicks]).addClass("pressed");
  setTimeout(function() {
    $("." + colors[randomclicks]).removeClass("pressed");
  }, 200);
  playaudio(colors[randomclicks]);
}
