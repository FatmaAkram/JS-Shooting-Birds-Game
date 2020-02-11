$(function () {
    //    let game = $("div");
    class MovableObject {
        constructor(left, top, speed, sprite) {
            this.leftPos = left;
            this.topPos = top;
            this.speed = speed;
            this.sprite = sprite;
            this.bird = document.createElement("img");
            this.bird.src = sprite;
            this.bird.style.left = left + "px";
            this.bird.style.top = top + "px";
            game.appendChild(this.bird);

        }
        get Bird() {
            return this.bird;
        }
        set Bird(birds) {
            this.bird = birds;
        }
        get left() {
            return this.leftPos;
        }
        set left(Left) {
            this.leftPos = Left;
        }
        get top() {
            return this.topPos;
        }
        set top(Top) {
            this.topPos = Top;
        }
        get Sprite() {
            return this.sprite;
        }
        set Sprite(spriteImg) {
            this.sprite = spriteImg;
        }
        get Speed() {
            return this.speed;
        }
        set Speed(SpriteSpeed) {
            this.speed = SpriteSpeed;
        }
    }
    class Bird extends MovableObject {
//        #
        birdType;
        constructor(left, top, speed, sprite) {
            super(left, top, speed, sprite);

        }
        getType() {
            return this.birdType = this.sprite.split('/')[1].split('.')[0];
        }
        move(randLeftRight) {
            var bird = super.Bird;
            var speed = super.Speed;
            var RandLeftRight = randLeftRight;
            var w = window.innerWidth;
            var left;
            var request;
            var lastTime = Date.now();
            var game = document.getElementById("game");
            // console.log(game);
            // console.log(bird);
            if (RandLeftRight === "left") {
                left = parseInt(bird.style.left);
            } else if (RandLeftRight === "right") {
                bird.style.left = (w) + "px";
                bird.style.transform = "scaleX(-1) scale(.5)";
                left = parseInt(bird.style.left);
            }

            function birdsMovement() {
                var now = Date.now();
                //                    console.log(game);
                //                     console.log(bird);
                var dt = (now - lastTime) / 1000.0;
                var top = parseInt(bird.style.top);
                if (RandLeftRight == "left") {
                    if (left >= w) {
                        window.cancelAnimationFrame(request);
                    }
                    left += 100 * speed * dt;
                    if (left > 200) top -= 20 * speed * dt;
                } else if (RandLeftRight == "right") {
                    if (left == 0) {
                        window.cancelAnimationFrame(request);
                    }
                    left -= 100 * speed * dt;
                    if (left < 300) {
                        top += 20 * speed * dt;
                    }
                }

                if (top > 800) {
                    window.cancelAnimationFrame(request);
                }
                bird.style.top = top + "px";
                bird.style.left = left + "px";
                lastTime = now;
                window.requestAnimationFrame(birdsMovement)
            }
            request = window.requestAnimationFrame(birdsMovement);
        }
    }

    function getRndNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    let score = 0;
    images = ["images/normalBird.gif", "images/bonusBird.gif", "images/blackBird.gif"];
    LeftRight = ["left", "right"];
    var ducks = [];
    i = 0;
    locations = [50, 400];
    var preLocation = 0;
    var id = setInterval(function () {
        do {
            randTop = getRndNumber(0, 2);
        } while (randTop == preLocation)
        randLeftRight = getRndNumber(0, 2);
        randbird = getRndNumber(0, 3);
        ducks[i] = new Bird(-100, locations[randTop], 2, images[randbird]);
        //                                console.log(ducks[i].Bird);

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

    //    game.addEventListener("click", function (event) {
    //        //        console.log(event.target);
    //
    //    });
    $("#game").on("click", "img", function () {
        //                      console.log( $(this)[0]);
        switch () {

        }
        $(this).fadeOut(500);
    });




});
