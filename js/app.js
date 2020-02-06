$(function () {
    class Duck {
        game = document.getElementById("game");

        constructor(left, top, speed, img) {
            this.bird = document.createElement("img");
            this.bird.src = img;
            this.bird.style.left = left + "px";
            this.bird.style.top = top + "px";
            game.appendChild(this.bird);
            this.speed = speed;

        }
        move() {
            var Bird = this.bird;
            var left = parseInt(Bird.style.left);
            var id = setInterval(function () {
                console.log(left);
                if (left >= 781) {
                    clearInterval(id);
//                    game.removeChild(Bird);
                } else {
                    left += 20;
                    Bird.style.left = left + "px";
                }


            }, 100);

        }

    }

    function getRndNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    images = ["images/normalBird.gif", "images/bonusBird.gif", "images/blackBird.gif"];
    var ducks = [];
    for (let i = 0; i < 3; i++) {
        randNum = getRndNumber(1, 800);
        randbird = getRndNumber(1, 3);
        ducks[i] = new Duck(1, randNum, 100, images[randbird]);
        ducks[i].move();
    }
    // setInterval(function(){
    //     $("#bird").animate({left:"+=200"},8000)
    //     $("#bird").animate({top:"+=200"},2000)
    // },7000);

});
