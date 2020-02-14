import {
    Player
} from "./Player.js";
import {
    Bird
} from "./Bird.js";
import {
    Sounds
} from "./Sounds.js";
import {
    Bomb
} from "./Bomb.js";

function getRndNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/** Global **/
let score = 0;
let images = ["Images/normalBird.gif", "Images/bonusBird.gif", "Images/blackBird.gif"];
let LeftRight = ["left", "right"];
let ducks = [];
let i = 0;
let locations = [50, 300];
let preLocation = 0;
let currentPlayer;
let currentPlayerId;
let save = true;
let users;
let id, timerId;
let endId;
let level = 2;
let duration = 60 * 1000;
let speed;
let countBirds = 0;

$("#start").on("click", function () {
    initGame();
    $("#startWrapper").css("visibility", "hidden");
    $("#start").css("visibility", "hidden");

});

function initGame() {
    getPreviousScore();
    id = renderGame();
    timerId = timer();
    endId = endGame();
}

function getPreviousScore() {
    let currentPlayerInfo = JSON.parse(localStorage.getItem("currentPlayer"));
    users = JSON.parse(localStorage.getItem("users"));
    if (currentPlayerInfo != null) {
        currentPlayerId = currentPlayerInfo.id;
        score = parseInt(users[currentPlayerId].score);
        level = parseInt(currentPlayerInfo.level);
        //        console.log(level);
        currentPlayer = new Player(currentPlayerInfo.name, score);
    } else {
        currentPlayer = new Player("Guest", score);
        save = false;
    }
    $("label[name=playername]").text(currentPlayer.Name);
    $("label[name=score]").text(currentPlayer.Score);
    $("label[name=level]").text(level);


}

function renderGame() {
    if (level == 1)
        speed = 2;
    else if (level == 2) {
        speed = 4;
        GetBomb();
    }
    let id = setInterval(function () {
        let randTop, randLeftRight, randbird;
        do {
            randTop = getRndNumber(0, 2);
        } while (randTop == preLocation)
        randLeftRight = getRndNumber(0, 2);
        randbird = getRndNumber(0, 3);
        ducks[i] = new Bird(-100, locations[randTop], speed, images[randbird]);
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
        //         console.log($(ducks[i].Bird));
        $(ducks[i].Bird).on("click", function () {
            countBirds++;
            updateScore($(this));
            $(this).fadeOut(1000);
            console.log("countBirds " + countBirds);
            if (countBirds > 20) {
                clearInterval(id);
                clearInterval(timerId);
                bombs.forEach(element => {
                    element.flag = false;
                });
                winningModal();
            }
        });
        i++;
        preLocation = randTop;
    }, 500);
    return id;
}
let bombs = [];

function GetBomb() {
    let bombLocations = [100, 200, 300, 400, 500, 600, 700, 800, 1000];
    let bombTimes = [4000, 1200, 3600, 6000, 5000];

    let j = 0;
    let bombTime;
    let preBombTime;
    setInterval(function () {
        let randLeft = getRndNumber(0, 8);
        let bombTime = getRndNumber(0, 5);
        setTimeout(function () {
            //        console.log("randLeft "+bombLocations[randLeft]+ " bombTimes "+bombTimes[bombTime]);
            bombs[i] = new Bomb(bombLocations[randLeft], -100, 1, "Images/bomb.png");
            $(bombs[i].Bird).addClass("bomb");
            $(bombs[i].Bird).on("click", function () {
                let jBomb = $(bombs[i].Bird);
                let bombLeft = parseInt(jBomb.css("left"));
                let bombTop = parseInt(jBomb.css("top"));
                //            console.log(bombLeft+" "+bombTop);
                console.log(jBomb);
                jBomb.attr("src", "../Images/bombExplode.gif")
                handleBomb(bombLeft, bombTop);
            });
            bombs = bombs[i].move(true, bombs);
            //        console.log(bombs);
        }, bombTimes[bombTime]);

    }, 10000);
}
$("#game").on("click", function () {
    Sounds.shotSound.play();
});

function handleBomb(bombLeft, bombTop) {
    $("img").toArray().forEach(function (item) {
        let birdLeft = parseInt($(item).css("left"));
        let birdTop = parseInt($(item).css("top"));
        //        console.log(birdLeft+" "+birdTop);
        if (birdLeft > bombLeft && birdLeft < bombLeft + 300 &&
            birdTop > bombTop && birdTop < bombTop + 300) {
            $(item).css("background", "red");
            $(item).trigger("click");
        }
    });
}

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

function winningModal() {
    $("#container").css("visibility", "visible");
    $("#contents").css("visibility", "visible");
    $("p").innerText += score;
}

function timer() {
    // let duration = 60 * 1000;
    let st = new Date().getTime();
    $("#progressbar").css("width", "500");
    $("#progressbar").progressbar(100);
    let id = setInterval(function () {
        let diff = Math.round(new Date().getTime() - st);
        $("#progressbar > div").css('background', '#1f9bdb');
        let val = Math.round(diff / duration * 100);
        if (val > 80) $("#progressbar > div").css('background', 'red');
        $("#progressbar").progressbar({
            value: 100 - val
        })
    }, 100);
    return id;
}
//end game
function endGame() {
    let endId = setTimeout(function () {
        //stop birds appearance
        clearInterval(id);
        //stop timer
        clearInterval(timerId);
        //stop moving birds
        //    ducks.forEach(element => {
        //        element.flag = false;
        //    });
        bombs.forEach(element => {
            element.flag = false;
        });
        winningModal();
        console.log("the End")
    }, duration);
    return endId;
}


$("#home").on("click", function () {
    window.location.href = "index.html";
});
$("#play").on("click", function () {
    clearInterval(endId);
    initGame();
    $("#container").css("visibility", "hidden");
    $("#contents").css("visibility", "hidden");
});
