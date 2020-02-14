import {
    Player
} from "./Player.js";
import {
    Bird
} from "./Bird.js";
import {
    Sounds
} from "./Sounds.js";

function getRndNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/** Global **/
let score = 0;
let images = ["Images/normalBird.gif", "Images/bonusBird.gif", "Images/blackBird.gif"];
let LeftRight = ["left", "right"];
let ducks = [];
let i = 0;
let locations = [50, 400];
let preLocation = 0;
let currentPlayer;
let currentPlayerId;
let save = true;
let users;
initGame();
function initGame() {
    getPreviousScore();
    let id = renderGame();
    var timerId = timer();
}

function getPreviousScore() {
    let currentPlayerInfo = JSON.parse(localStorage.getItem("currentPlayer"));
    users = JSON.parse(localStorage.getItem("users"));
    if (currentPlayerInfo != null) {
        currentPlayerId = currentPlayerInfo.id;
        score = parseInt(users[currentPlayerId].score);
        currentPlayer = new Player(currentPlayerInfo.name, score);
    } else {
        currentPlayer = new Player("Guest", score);
        save = false;
    }
    $("label[name=playername]").text(currentPlayer.Name);
    $("label[name=score]").text(currentPlayer.Score);

}

function renderGame() {
    let id = setInterval(function () {
        let randTop, randLeftRight, randbird;
        do {
            randTop = getRndNumber(0, 2);
        } while (randTop == preLocation)
        randLeftRight = getRndNumber(0, 2);
        randbird = getRndNumber(0, 3);
        ducks[i] = new Bird(-100, locations[randTop], 2, images[randbird]);
        switch (ducks[i].getType()) {
            case "normalBird":
                ducks[i].Bird.classList.add("normalBird");
                break;
            case "bonusBird":
                ducks[i].Bird.classList.add("bonusBird");
                break;
            case "blackBird":
                ducks[i].Bird.classList.add("blackBird");
                break;
        }
        ducks[i].move(LeftRight[randLeftRight]);
        i++;
        preLocation = randTop;
    }, 1000);
    return id;
}
$("#game").on("click", function () {
    Sounds.shotSound.play();
    let currentBirds = $("img");
    for (let i = 0; i < ducks.length; i++) {
        console.log(ducks[i]);
    }
});
$("#game").on("click", "img", function () {
    updateScore($(this));
    $(this).fadeOut(200);

});

function updateScore(clickedBird) {

    if (clickedBird.hasClass("normalBird")) {
        currentPlayer.Score += 5;
        clickedBird.attr("src", "Images/fireBird.gif");
        Sounds.normalShot.play();
    } else if (clickedBird.hasClass("bonusBird")) {
        currentPlayer.Score += 10;
        Sounds.bonusSound.play();
    } else if (clickedBird.hasClass("blackBird")) {
        currentPlayer.Score -= 10;
        Sounds.blackShot.play();
    }
    $("label[name=score]").text(currentPlayer.Score);
    if (save) {
        currentPlayer.saveData(users, currentPlayerId);
    }
}
function timer() {
    let duration = 60 * 1000;
    let st = new Date().getTime();
    $("#progressbar").css("width", "500");
    $("#progressbar").progressbar(100);
    let id = setInterval(function () {
        let diff = Math.round(new Date().getTime() - st);
        $("#progressbar > div").css('background', 'green');
        let val = Math.round(diff / duration * 100);
        if (val > 80) $("#progressbar > div").css('background', 'red');
        $("#progressbar").progressbar({
            value: 100 - val
        })
    }, 100);
    return id;
}
