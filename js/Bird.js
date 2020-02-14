import {MovableObject} from "./MovableObject.js";
class Bird extends MovableObject {
    #birdType;
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
        var width = window.innerWidth;
        var height = window.innerHeight;
        var left;
        var request;
        var lastTime = Date.now();
        var game = document.getElementById("game");
        // console.log(game);
        // console.log(bird);
        if (RandLeftRight === "left") {
            left = parseInt(bird.style.left);
        } else if (RandLeftRight === "right") {
            bird.style.left = (width - 150) + "px";
            bird.style.transform = "scaleX(-1) scale(.5)";
            left = parseInt(bird.style.left);
        }
        function birdsMovement() {
            var now = Date.now();
            // console.log(game);
            // console.log(bird.parentNode);
            var dt = (now - lastTime) / 1000.0;
            var top = parseInt(bird.style.top);
            if (RandLeftRight == "left") {
                if (left >= width - 150) {
                    window.cancelAnimationFrame(request);
                    if (bird.parentNode != null)
                        bird.parentNode.removeChild(bird);
                }
                left += 100 * speed * dt;
                if (left > 200) top -= 20 * speed * dt;
            } else if (RandLeftRight == "right") {
                if (left == 0) {
                    window.cancelAnimationFrame(request);
                    if (bird.parentNode != null)
                        bird.parentNode.removeChild(bird);
                }
                left -= 100 * speed * dt;
                if (left < 300) {
                    top += 20 * speed * dt;
                }
            }

            if (top > height - 100) {
                window.cancelAnimationFrame(request);
                if (bird.parentNode != null)
                    bird.parentNode.removeChild(bird);
            }
            bird.style.top = top + "px";
            bird.style.left = left + "px";
            lastTime = now;
            window.requestAnimationFrame(birdsMovement)
        }
        request = window.requestAnimationFrame(birdsMovement);
    }
}
export { Bird };

