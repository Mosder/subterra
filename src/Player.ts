import { Coords } from "./interfaces";
import { boardSize, playerSize, bulletSize, audioPlayer } from "./consts";
import { Bullet } from "./Bullet";

class Player {
    position: Coords;
    shield: number = 0;
    speed: number = 3.5;
    speedDelay: number = 3;
    blockedMovement: string[] = [];
    spriteStage: number = 0;
    shieldSpriteStage: number = -1;
    justShot: number = 0;
    hp: number = 5;
    movement: Coords = { x: 0, y: 0 };
    justDied: boolean = false;

    constructor() {
        this.moveTo({ x: 10, y: (boardSize.height - playerSize.height) / 2 });
        this.activateShield();
        this.moving();
    }

    moveTo(coords: Coords) {
        if (!this.justDied)
            this.position = this.stayInBox(coords);
    }

    moving() {
        setInterval(() => {
            this.moveTo({
                x: this.position.x + this.movement.x * this.speed,
                y: this.position.y + this.movement.y * this.speed
            });
        }, this.speedDelay);
    }

    move(dir: string, key: string) {
        if (this.blockedMovement.includes(key))
            return;
        this.blockedMovement.push(key);
        let direction = this.getDirection(dir);
        this.movement = {
            x: this.movement.x + direction.x,
            y: this.movement.y + direction.y
        }
        let cancelled = false;
        document.body.addEventListener("keyup", (e) => {
            if (e.key === key && !cancelled) {
                cancelled = true;
                this.blockedMovement = this.blockedMovement.filter(val => val !== key);
                this.movement = {
                    x: this.movement.x - direction.x,
                    y: this.movement.y - direction.y
                }
            }
        });
    }

    getDirection(direction: string): Coords {
        if (direction == "up")
            return { x: 0, y: -1 }
        else if (direction == "right")
            return { x: 1, y: 0 }
        else if (direction == "down")
            return { x: 0, y: 1 }
        else if (direction == "left")
            return { x: -1, y: 0 }
    }

    stayInBox(coords: Coords): Coords {
        const bounds = {
            x: boardSize.width - playerSize.width,
            y: boardSize.height - playerSize.height
        }
        coords.x = coords.x < 0 ? 0 : (coords.x > bounds.x * 0.7 ? bounds.x * 0.7 : coords.x);
        coords.y = coords.y < 30 ? 30 : (coords.y > bounds.y - 65 ? bounds.y - 65 : coords.y);
        return coords;
    }

    shoot(): Bullet[] {
        if (this.justShot || this.justDied)
            return [new Bullet({ x: 69420, y: 2137 })];
        audioPlayer.play("shot", false);
        this.justShot = 1;
        setTimeout(() => {
            this.justShot = 0;
        }, 120);
        if (!this.isVertical())
            return [new Bullet({ x: this.position.x + playerSize.width, y: this.position.y + playerSize.height - bulletSize.height })];
        else
            return [
                new Bullet({ x: this.position.x + playerSize.width, y: this.position.y + playerSize.height - bulletSize.height * 2 / 3 }),
                new Bullet({ x: this.position.x + playerSize.width, y: this.position.y - 1 })
            ];
    }

    activateShield() {
        audioPlayer.play("shield", false);
        this.shield = 0.25;
        let shieldInterval = setInterval(() => {
            this.shield += 0.25;
            if (this.shield >= 5) {
                clearInterval(shieldInterval);
                shieldInterval = setInterval(() => {
                    this.shield -= 0.25;
                    if (this.shield <= 0) {
                        clearInterval(shieldInterval);
                    }
                }, 220);
            }
        }, 20);
        this.spriteStage = 1;
        let spriteDiff = -1;
        this.shieldSpriteStage = 0;
        let spriteInterval = setInterval(() => {
            if (this.spriteStage == 1 || this.spriteStage == 5)
                spriteDiff *= -1;
            this.spriteStage += spriteDiff;
            this.shieldSpriteStage += 0.5;
            if (this.shieldSpriteStage >= 4)
                this.shieldSpriteStage = 0;
            if (this.shield <= 0.25) {
                clearInterval(spriteInterval);
                this.spriteStage = 0;
                this.shieldSpriteStage = -1;
            }
        }, 60);
    }

    isVertical(): boolean {
        if (!this.movement.y || this.position.y == 30 || this.position.y == boardSize.height - playerSize.height - 65)
            return false;
        return true;
    }

    kill(): boolean {
        if (this.shield > 0)
            return false;
        audioPlayer.play("player", false);
        return true;
    }
}

export { Player };
