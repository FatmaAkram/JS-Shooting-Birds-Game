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
export { MovableObject };
