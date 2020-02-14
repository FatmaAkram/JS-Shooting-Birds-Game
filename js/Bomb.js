import {
    MovableObject
} from "./MovableObject.js";
class Bomb extends MovableObject {
    constructor(left, top, speed, sprite) {
        super(left, top, speed, sprite);
        this.Speed = speed;

        this.flag = false;
    }
    move(flag,_bombs) {
        let bomb = super.Bird;
        bomb.style.transform = "scale(.5)";
        this.flag = flag;
        let lastTime = Date.now();
        let left = parseInt(bomb.style.left);
        let self = this;
        let height = window.innerHeight;
        let request;
        let bombs =_bombs;
        function movement() {
            let now = Date.now();
            let dt = (now - lastTime) / 1000.0;
            let top = parseInt(bomb.style.top);
            if (top <= height) {
                top += self.Speed * dt;
                bomb.style.top = top + "px";
            } else {
                if (bomb.parentNode != null) {
                    bomb.parentNode.removeChild(bomb);
                    let index = bombs.indexOf(self);
                    if (index > -1) bombs.splice(index, 1);
                }

            }
            if (self.flag) {
                request = window.requestAnimationFrame(movement);
            }
        }
        movement();
       return bombs; 
    }
}
export { Bomb };
