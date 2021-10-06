var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []; 
var userClickedPattern = [];
var newGame = true;
var level = 0;


$(document).keypress(function(){
    if(newGame === true){
        newGame = false;
        gamePattern = [];
        userClickedPattern = [];
        updateLevel();
        nextSequence();
    }
    
});

function updateLevel(){
    $("#level-title").text("Level " + level);
}

function nextSequence(){
    userClickedPattern = [];

    level++;
    updateLevel();

    var randomNumber = Math.random();
    randomNumber *= 4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);


}

 $(".btn").on("click", function(){
     var userChosenColor  = $(this).attr("id");
     userClickedPattern.push(userChosenColor);

     playSound(userChosenColor);
     animatePress(userChosenColor);

     checkAnswer(userClickedPattern.length-1);
 });


function playSound(soundName){
    var audio = new Audio('sounds/'+ soundName+'.mp3');
    audio.play();   
}

function animatePress(currentColour){
    $("." + currentColour ).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour ).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Right level");
        console.log("userClickedPattern" + userClickedPattern);
        console.log("gamePattern" + gamePattern);

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        console.log("Wrong level");
        playSound("wrong");

        $("body" ).addClass("game-over");
        setTimeout(function() {
            $("body" ).removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    newGame = true;
}